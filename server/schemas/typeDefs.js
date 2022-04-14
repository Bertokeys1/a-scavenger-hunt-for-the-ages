const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    hunts: [Hunt]
  }

  type Challenge {
    _id: ID!
    challengename: String!
    location: String
    todo: String
    check: Boolean
  }
  
  input ChallengeData {
    challenge: String!
    location: String
    todo: String
  }

  type Hunt {
    _id: ID!
    huntname: String!
    challenges: [Challenge]
  }

  input HuntData {
    huntname: String!
    challenges: [Challenge]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    hunt (huntname: String!): Hunt
    challenges: [Challenge]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createHunt(huntname: String!, challenges: [String]!): Hunt
    updateHunt(huntname: String!, challenges: [String]!): Hunt
    deleteHunt(_id: ID!): User
    createChallenge(data:ChallengeData): Challenge
    updateChallenge(_id:ID! data:ChallengeData): Challenge
    deleteChallenge(_id: ID!): Hunt
    checkChallenge(_id: ID!): Challenge
  }
`;

module.exports = typeDefs;
