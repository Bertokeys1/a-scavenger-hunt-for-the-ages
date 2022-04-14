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
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
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
  }
};

module.exports = resolvers;
