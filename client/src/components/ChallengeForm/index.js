import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHALLENGE} from "../../utils/mutations";
import {Button, TextField} from '@mui/material';
import SaveIcon from "@mui/icons-material/Save";

const style = {
  inputProps:{
    style:{
      fontFamily: "Amatic SC, cursive",
      fontSize: 28,
    }
  },
  inputLabelProps: {
    style:{
      fontFamily: "Amatic SC, cursive",
    }
  },
  button: {
    fontFamily: "Amatic SC, cursive",
    fontSize: 20,
  }
};

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
          <h2 className="card-header bg-dark text-light p-2">New Challenge</h2>
          <div className="card-body">
            {(
              <form>
                 <TextField
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  fullWidth 
                  placeholder="Challenge Name"
                  name="challengeName"
                  label="Challenge Name"
                  value={formData.challengeName}
                  onChange={handleInputChange}
                />
                 <TextField
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  fullWidth
                  placeholder="Challenge task"
                  name="todo"
                  label="Challenge task"
                  value={formData.todo}
                  onChange={handleInputChange}
                />
                <TextField
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  fullWidth
                  placeholder="Street Adress"
                  name="address1"
                  label="Street Adress"
                  value={formData.address1}
                  onChange={handleInputChange}
                />
                <TextField
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  fullWidth
                  placeholder="Building/Unit number"
                  name="address2"
                  label="Building/Unit number"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
                <TextField
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  fullWidth
                  placeholder="City"
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <TextField
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  fullWidth
                  placeholder="State"
                  name="state"
                  label="State"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <TextField
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  fullWidth
                  placeholder="Zip Code"
                  name="zipCode"
                  label="Zip Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
                <Button
                  sx={style.button}   
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

export default ChallengeForm;
