import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_HUNTS } from "../../utils/queries";
import { CREATE_CHALLENGE} from "../../utils/mutations";

const ChallengeForm = () => {
  const { data } = useQuery(QUERY_HUNTS);

  const [formData, setFormData] = useState({
    challengeName: '',
    location: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
    },
    todo: '',
  });
  let navigate = useNavigate();

  const [createChallenge, { error }] = useMutation(CREATE_CHALLENGE);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createChallenge({
        variables: {data: {...formData}},
      });

      navigate(`/hunt/${data.createChallenge._id}`);
    } catch (err) {
      console.error(err);
    }

    setFormData({
      challengeName: "",
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
                  name="location"
                  type="text"
                  value={formData.location.address1}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="Building/Unit number"
                  name="challengeAddress2"
                  type="text"
                  value={formData.location.address2}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="City"
                  name="challengeCity"
                  type="text"
                  value={formData.location.city}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="State"
                  name="challengeState"
                  type="text"
                  value={formData.location.state}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="Zip Code"
                  name="challengeZip"
                  type="text"
                  value={formData.location.zipCode}
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
