import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
// import { QUERY_HUNTS } from "../../utils/queries";
import { CREATE_HUNT } from "../../utils/mutations";

const HuntForm = () => {
//   const { data } = useQuery(QUERY_HUNTS);

  const [formData, setFormData] = useState({
    huntName: "",
  });
  let navigate = useNavigate();

  const [createHunt, { error }] = useMutation(CREATE_HUNT);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createHunt({
        variables: {...formData},
      });

      navigate(`/hunt/${data.createHunt._id}`);
    } catch (err) {
      console.error(err);
    }

    setFormData({
      huntName: "",
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">New Hunt</h4>
          <div className="card-body">
            {(
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your Hunts's Name"
                  name="huntname"
                  type="text"
                  value={formData.name}
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

export default HuntForm;
