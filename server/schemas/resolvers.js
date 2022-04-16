const { AuthenticationError } = require('apollo-server-express');
const { User, Challenge, Hunt  } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, { username }) => {
      return User.findOne({ username });
    },
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    hunts: async(_, __, context) => {
      if (context.user) {
        return Hunt.findAll();
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    hunt: async (_, {huntId}, context) => {
      if (context.user) {
        return Hunt.findById(huntId).populate('challenges');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    challenges: async (_, __, context) => {
      if (context.user) {
        return Challenge.findAll();
      }
      throw new AuthenticationError('You need to be logged in!');
    }
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
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createHunt: async (_, {data}, context) => {
      if (context.user) {
        const hunt = await Hunt.create({
          huntName: data.huntName, 
          challenges: data.challenges 
        });
        const user = await User.findOneAndUpdate(
          {_id: context.user._id},
          {$push: {hunts: hunt._id}},
          {new: true}
        );
        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateHunt: async (_, {_id, data}, context) => {
      if (context.user) {
        const updatedHunt = await Hunt.findByIdAndUpdate(
          {_id},
          {
            huntName: data.huntName, 
            challenges: data.challenges
          },
          {new: true}
        );
        return updatedHunt;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteHunt: async (_, {_id}, context) => {
      if (context.user) {
        const hunt = await Hunt.findByIdAndDelete(_id);

        const user = await User.findOneAndUpdate(
          {_id: context.user._id},
          {$pull: {hunts: hunt._id}},
          {new: true}
        );
        return user;
        
      }
      throw new AuthenticationError('You need to be logged in!')
    }
  }
};

module.exports = resolvers;
