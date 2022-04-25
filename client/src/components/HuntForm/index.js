import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_HUNT } from "../../utils/mutations";
import { Button, TextField } from "@mui/material"
import SaveIcon from "@mui/icons-material/Save";

const HuntForm = () => {
  const [formData, setFormData] = useState({
    huntName: "",
  });
  
  const [createHunt, { error }] = useMutation(CREATE_HUNT);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, huntName: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createHunt({
        variables: {data: {...formData}},
      });

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
              <form>
                <TextField
                  fullWidth 
                  placeholder="Scavenger Hunt Name"
                  name="huntName"
                  label="Scavenger Hunt Name"
                  value={formData.huntName}
                  onChange={handleInputChange}
                /> 
                <Button
                  fullWidth
                  onClick={handleFormSubmit} 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SaveIcon />}>
                  Submit      
                </Button>
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
