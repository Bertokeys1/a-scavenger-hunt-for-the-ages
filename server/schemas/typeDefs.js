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
    challengeName: String!
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
    huntName: String!
    challenges: [Challenge]
  }

  input HuntData {
    huntName: String!
    challenges: [ChallengeData]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    hunt (_id: ID!): Hunt
    challenges: [Challenge]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createHunt(data:HuntData!): Hunt
    updateHunt(_id: ID! data:HuntData!): Hunt
    deleteHunt(_id: ID!): User
    createChallenge(data:ChallengeData): Challenge
    updateChallenge(_id:ID! data:ChallengeData): Challenge
    deleteChallenge(_id: ID!): Hunt
    checkChallenge(_id: ID!): Challenge
  }
`;

module.exports = typeDefs;
