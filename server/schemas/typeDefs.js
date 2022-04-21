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
    location: Address
    todo: String
    check: Boolean
  }

  type Address {
    address1: String
    address2: String
    city: String
    state: String
    zipCode: String
  }
  
  input ChallengeData {
    challengeName: String!
    location: AddressData
    todo: String
  }

  input AddressData {
    address1: String
    address2: String
    city: String
    state: String
    zipCode: String
  }
  
  type Hunt {
    _id: ID!
    huntName: String!
    challenges: [Challenge]
  }

  input HuntData {
    huntName: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    hunts: [Hunt]
    hunt (_id: ID!): Hunt
    }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    createHunt(data:HuntData!): User
    updateHunt(_id: ID!, huntName: String!): Hunt
    deleteHunt(_id: ID!): User

    createChallenge(data:ChallengeData, huntId: ID!): Hunt
    updateChallenge(huntId: ID!, challengeId:ID!, data:ChallengeData): Hunt
    deleteChallenge(challengeId: ID!, huntId: ID!): Hunt
    checkChallenge(huntId: ID!, challengeId: ID!): Hunt
  }
`;

module.exports = typeDefs;
