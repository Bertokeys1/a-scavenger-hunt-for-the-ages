import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import ExploreIcon from '@mui/icons-material/Explore';
import { Button, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Auth from '../utils/auth';
import { palette } from '@mui/system';

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
    margin:.5
  },
  textfield:{
    margin:.5
  }
};

const theme = createTheme({
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

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body bg-light">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form>
                <TextField
                  fullWidth
                  sx={style.textfield} 
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  placeholder="Your username"
                  name="username"
                  type="text"
                  label="Username"
                  value={formState.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  sx={style.textfield}
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  placeholder="Your email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  sx={style.textfield}
                  inputProps={style.inputProps} 
                  InputLabelProps={style.inputLabelProps}
                  placeholder="******"
                  name="password"
                  type="password"
                  label="Password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button 
                  sx={style.button}   
                  fullWidth
                  size="large"
                  onClick={handleFormSubmit} 
                  variant="contained" 
                  color="secondary" 
                  startIcon={<ExploreIcon />}>
                  Create Account      
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

export default Signup;
