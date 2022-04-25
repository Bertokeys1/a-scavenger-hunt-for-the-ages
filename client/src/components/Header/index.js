import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from '@mui/material'
import Auth from '../../utils/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';

const style = {
  background: "#800020"
}

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="text-light mb-4 py-3 flex-row align-center" style={style}>
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">A Scavenger Hunt For The Ages</h1>
          </Link>
          <p className="m-0">Get into trouble.</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Button 
              component={Link} 
              to="/me" 
              variant="contained" 
              color="primary"
              size="large"
              startIcon={<MapIcon/>}>
                {Auth.getProfile().data.username}'s hunts
              </Button>
              <Button
              onClick={logout}
              variant="contained" 
              color="secondary" 
              size="large"
              endIcon={<LogoutIcon/>} 
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
              component={Link} 
              to="/login" 
              variant="contained" 
              color="primary"
              size="large"
              startIcon={<ExploreIcon/>}>
                Login
              </Button>
              <Button 
              component={Link} 
              to="/signup" 
              variant="contained" 
              color="secondary"
              size="large"
              startIcon={<AddIcon/>}>
                Signup
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
