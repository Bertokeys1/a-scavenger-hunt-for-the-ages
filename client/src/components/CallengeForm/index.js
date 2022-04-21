import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_CHALLENGE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const ChallengeForm = ({ thoughtId }) => {
  const [challengeData, setChallengeData] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addChallenge, { error }] = useMutation(ADD_CHALLENGE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addChallenge({
        variables: {
          huntId,
          challengeName,
          location: {
              address1,
              address2,
              city,
              state,
              zipCode
          },
          todo
        },
      });

      setChallengeName('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'ChallengeName' && value.length <= 280) {
      setChallengeName(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>Add your challenge!</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <ChallengeForm
                name="ChallengeData"
                placeholder="Add your Challenge..."
                value={ChallengeName}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></ChallengeForm>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Challenge
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ChallengeForm;