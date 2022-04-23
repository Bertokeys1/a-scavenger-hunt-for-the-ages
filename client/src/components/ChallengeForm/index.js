import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHALLENGE} from "../../utils/mutations";

const ChallengeForm = ({huntId}) => {

  const [formData, setFormData] = useState({
    challengeName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    todo: '',
  });

  const [createChallenge, { error }] = useMutation(CREATE_CHALLENGE);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createChallenge({
        variables: {
          huntId,
          data: {
            challengeName: formData.challengeName,
            location:{
              address1: formData.address1,
              address2: formData.address2,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode
            },
            todo: formData.todo}},
      });

    } catch (err) {
      console.error(err);
    }

    setFormData({
      challengeName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      todo: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">New Challenge</h4>
          <div className="card-body">
            {(
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Challenge Name"
                  name="challengeName"
                  type="text"
                  value={formData.challengeName}
                  onChange={handleInputChange}
                ></input>
                <input
                  className="form-input"
                  placeholder="Challenge task"
                  name="todo"
                  type="text"
                  value={formData.todo}
                  onChange={handleInputChange}
                ></input>
                <input
                  className="form-input"
                  placeholder="Street Adress"
                  name="address1"
                  type="text"
                  value={formData.address1}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="Building/Unit number"
                  name="address2"
                  type="text"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="City"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="State"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="Zip Code"
                  name="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={handleInputChange}
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

export default ChallengeForm;
