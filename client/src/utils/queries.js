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
