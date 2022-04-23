const { AuthenticationError } = require("apollo-server-express");
const { User, Hunt } = require("../models");
const { schema } = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("hunts");
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate("hunts");
    },
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("hunts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    hunts: async (_, __, context) => {
      if (context.user) {
        return Hunt.find().populate("challenges");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    hunt: async (_, { huntId }, context) => {
      if (context.user) {
        return Hunt.findById(huntId).populate("challenges");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    /** Hunt mutations */
    createHunt: async (_, { data }, context) => {
      if (context.user) {
        const hunt = await Hunt.create({
          huntName: data.huntName,
          challenges: [],
        });
        const user = await User.findOneAndUpdate({ _id: context.user._id }, { $push: { hunts: hunt._id } }, { new: true }).populate("hunts");
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateHunt: async (_, { _id, data }, context) => {
      if (context.user) {
        const updatedHunt = await Hunt.findByIdAndUpdate(
          { _id },
          {
            huntName: data.huntName,
            challenges: data.challenges,
          },
          { new: true }
        );
        return updatedHunt;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteHunt: async (_, { _id }, context) => {
      if (context.user) {
        const hunt = await Hunt.findByIdAndDelete(_id);

        const user = await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { hunts: hunt._id } }, { new: true });
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    /** Challenge mutations */
    createChallenge: async (_, { huntId, data }, context) => {
      if (context.user) {
        const hunt = await Hunt.findOneAndUpdate(
          { _id: huntId },
          {
            $push: {
              challenges: {
                challengeName: data.challengeName,
                location: {
                  address1: data.location.address1,
                  address2: data.location.address2,
                  city: data.location.city,
                  state: data.location.state,
                  zipCode: data.location.zipCode,
                },
                todo: data.todo,
                check: 0,
              },
            },
          },
          { new: true,
            runValidators: true
          }
        );
        return hunt;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateChallenge: async (_, { huntId, challengeId, data }, context) => {
      if (context.user) {
        const {
          challengeName,
          todo,
          location: { address1, address2, city, state, zipCode },
        } = data;

        const hunt = await Hunt.findById(huntId);

        for (let i = 0; i < hunt.challenges.length; i++) {
          const stringifiedId = hunt.challenges[i]._id.toString();
          const challenge = hunt.challenges[i]

          if (stringifiedId === challengeId) {
            challenge.challengeName = challengeName;
            challenge.todo = todo;
            challenge.location.address1 = address1;
            challenge.location.address2 = address2;
            challenge.location.city = city;
            challenge.location.state = state;
            challenge.location.zipCode = zipCode;
          }
        }

        await hunt.save();

        return hunt;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteChallenge: async (_, { challengeId, huntId }, context) => {
      if (context.user) {
   
        const hunt = await Hunt.findOneAndUpdate(
          { _id: huntId }, 
          { $pull: 
            { challenges: 
              {_id: challengeId} 
            } 
          }, 
          { new: true });
        return hunt;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    checkChallenge: async (_, { challengeId, huntId }, context) => {
      if (context.user) {
        const hunt = await Hunt.findById(huntId);

        for (let i = 0; i < hunt.challenges.length; i++) {
          const stringifiedId = hunt.challenges[i]._id.toString();

          if (stringifiedId === challengeId) {
            if (hunt.challenges[i].check === false) {
              hunt.challenges[i].check = true;
            } else {
              hunt.challenges[i].check = false;
            }
          }
        }

        await hunt.save();

        return hunt;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
