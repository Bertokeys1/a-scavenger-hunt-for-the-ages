import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_CHALLENGE } from "../utils/mutations";

import Auth from "../utils/auth";

const Hunt = (props) => {
  const [challengeState, setChallengeState] = useState({
    challengeName: "",
    todo: "",
    check: "",
    location: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  
  const [updateChallenge, { error, data }] = useMutation(UPDATE_CHALLENGE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setChallengeState({
      ...challengeState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(challengeState);
    // Do something with the form submit
    try {
      const { data } = await updateChallenge({
        variables: { ...challengeState },
      });
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setChallengeState({
      challengeName: "",
      todo: "",
      check: "",
      location: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      },
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input className="form-input" placeholder="Your email" name="email" type="email" value={challengeState.email} onChange={handleChange} />
                <input className="form-input" placeholder="******" name="password" type="password" value={challengeState.password} onChange={handleChange} />
                <button className="btn btn-block btn-primary" style={{ cursor: "pointer" }} type="submit">
                  Submit
                </button>
              </form>
            )}

            {error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hunt;
