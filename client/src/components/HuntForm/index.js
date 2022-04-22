import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_HUNT } from "../../utils/mutations";

const HuntForm = () => {
  const [formData, setFormData] = useState({
    huntName: "",
  });
  // let navigate = useNavigate();

  const [createHunt, { error }] = useMutation(CREATE_HUNT);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, huntName: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createHunt({
        variables: {data: {...formData}},
      });

      console.log(data);
      // navigate(`/hunts/${data.createHunt._id}`);
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
                  value={formData.huntName}
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
