import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      hunts{
        _id
        huntName
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      hunts{
        _id
        huntName
      }
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

export const QUERY_SINGLE_HUNT = gql`
  query getSingleHunt($huntId: ID!) {
    hunt(huntId: $huntId) {
      _id
      huntName
      challenges {
        _id
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
export const QUERY_CHALLENGES = gql`
  query getChallenges {
    hunts {
      _id
      huntName
      challenges {
        _id
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
      challenge(challengeId: $challengeId) {
        _id
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