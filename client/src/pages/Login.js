import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import ExploreIcon from '@mui/icons-material/Explore';
import { Button, TextField } from "@mui/material"
import Auth from '../utils/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  typography: {
    fontFamily: "Amatic SC, cursive",
    fontSize: 20
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

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
    
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body bg-light">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form>
                <TextField
                  sx={style.textfield}
                  inputProps={style.inputProps}   
                  InputLabelProps={style.inputLabelProps} 
                  fullWidth 
                  placeholder="Your email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <TextField
                  sx={style.textfield}
                  inputProps={style.inputProps}   
                  InputLabelProps={style.inputLabelProps} 
                  fullWidth 
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
                  Login      
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

export default Login;
