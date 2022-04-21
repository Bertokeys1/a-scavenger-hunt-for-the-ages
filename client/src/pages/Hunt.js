import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { CREATE_HUNT } from "../utils/mutations";
// check nameis correct before testing

import Auth from "../utils/auth";

const Hunt = () => {
  const [formState, setFormState] = useState({
    huntname: "",
  });
  const [createHunt, { error, data }] = useMutation(CREATE_HUNT);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await createHunt({
        variables: { data: {...formState}},
      });
<<<<<<< HEAD
      
=======

    //   Auth.login(data.createHunt.token);
>>>>>>> d4494f3d821a464b998504b0ae1120bec0b0bd6a
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      huntname: "",
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">New Hunt</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your Hunts's Name"
                  name="huntname"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hunt;
