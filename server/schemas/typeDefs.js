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
    location: [Address]
    todo: String
    check: Boolean
  }

  type Address {
    address1: String
    address2: String
    city: String!
    state: String!
    zipCode: String
  }
  
  input ChallengeData {
    challengeName: String!
    location: [AddressData]
    todo: String
  }

  input AddressData {
    address1: String
    address2: String
    city: String!
    state: String!
    zipCode: String
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
    hunts: [Hunt]
    hunt (_id: ID!): Hunt
    challenges: [Challenge]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createHunt(data:HuntData!): User
    updateHunt(_id: ID! data:HuntData!): Hunt
    deleteHunt(_id: ID!): User
    createChallenge(data:ChallengeData): Challenge
    updateChallenge(_id:ID! data:ChallengeData): Challenge
    deleteChallenge(_id: ID!): Hunt
    checkChallenge(_id: ID!): Challenge
  }
`;

module.exports = typeDefs;
