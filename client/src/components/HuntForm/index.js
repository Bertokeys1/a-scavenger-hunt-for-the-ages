import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_HUNT } from "../../utils/mutations";
import { Button, TextField } from "@mui/material"
import SaveIcon from "@mui/icons-material/Save";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const style = {
  inputProps:{
    style:{
      fontFamily: "Amatic SC, cursive",
      fontSize: 30,
      fontType: "Bold"
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
    margin:.5
  },
  textfield:{
    margin:.5
  }
};

const theme = createTheme({
  typography: {
    fontFamily: "Amatic SC, cursive",
    fontSize: "1.5rem"
  },
  palette: {
    primary: {
      main: "#4A494A",
    },
    secondary: {
      main: "#4A7B9D",
    },
    warning: {
      main: "#800020"
    }
  }
});

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
    <ThemeProvider theme={theme}>
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h2 className="card-header bg-dark text-light p-2">New Hunt</h2>
          <div className="card-body">
            {(
              <form>
                <TextField
                  sx={style.textfield}
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  fullWidth 
                  placeholder="Scavenger Hunt Name"
                  name="huntName"
                  label="Scavenger Hunt Name"
                  value={formData.huntName}
                  onChange={handleInputChange}
                /> 
                <Button
                  sx={style.button}   
                  fullWidth
                  onClick={handleFormSubmit} 
                  variant="contained" 
                  color="secondary" 
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
    </ThemeProvider>
  );
};

export default HuntForm;
