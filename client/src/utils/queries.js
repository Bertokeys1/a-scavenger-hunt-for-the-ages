import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_HUNTS = gql`
  query getHunts {
    hunts {
      _id
      huntName
    }
  }
`;

export const QUERY_SINGLE_HUNTS = gql`
  query getSingleHunt($huntId: ID!) {
    hunt(huntId: $huntId) {
      _id
      huntName
      challenges {
        challengeId
        challengeName
        location
        todo
        check
      }
    }
  }
`;
export const QUERY_CHALLENGES = gql`
  query getChallenges {
    hunts {
      _id
      huntName
      challenges {
        challengeId
        challengeName
        location {
          address1
          address2
          city
          state
          zipCode
        }
        todo
        check
      }
    }
  }
`;

export const QUERY_SINGLE_CHALLENGE = gql`
  query getSingleChallenge($huntId: ID!) {
    hunt(huntId: $huntId) {
      _id
      huntName
      challenges(challengeId: $challengeId) {
        challengeId
        challengeName
        location {
          address1
          address2
          city
          state
          zipCode
        }
        todo
        check
      }
    }
  }
`;