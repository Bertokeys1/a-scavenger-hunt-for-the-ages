import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_HUNT = gql`
  mutation createHunt($data: HuntData!) {
    createHunt(data: $data) {
      _id
      username
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
}
`;

export const UPDATE_HUNT = gql`
  mutation updateHunt($id: ID!, $huntName: String!) {
  updateHunt(_id: $id, huntName: $huntName) {
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

export const DELETE_HUNT = gql`
  mutation deleteHunt($id: ID!) {
  deleteHunt(_id: $id) {
    _id
    username
    email
    hunts {
      _id
      huntName
    }
  }
}
`;

export const CREATE_CHALLENGE = gql`
  mutation createChallenge($huntId: ID!, $data: ChallengeData!) {
  createChallenge(huntId: $huntId, data: $data) {
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

export const UPDATE_CHALLENGE = gql`
  mutation updateChallenge($huntId: ID!, $challengeId: ID!, $data: ChallengeData) {
  updateChallenge(huntId: $huntId, challengeId: $challengeId, data: $data) {
    _id
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

export const DELETE_CHALLENGE = gql`
  mutation deleteChallenge($challengeId: ID!, $huntId: ID!) {
  deleteChallenge(challengeId: $challengeId, huntId: $huntId) {
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

export const CHECK_CHALLENGE = gql`
  mutation checkChallenge($challengeId: ID!, $huntId: ID!) {
  checkChallenge(challengeId: $challengeId, huntId: $huntId) {
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
