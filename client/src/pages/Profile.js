import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import HuntForm from '../components/HuntForm';
import HuntList from '../components/HuntList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';



const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  
  return (
    <div className= "my-5">
        <div className= "my-5">
      <div className="flex-row justify-center">
        <h1 className="col-12 col-md-10 text-dark">
        {user.username}'s Hunts
        </h1>

        
        <div className="col-12 col-md-10 my-5">
          <HuntList
            hunts={user.hunts}  
            />
        </div>
        {!userParam && (
          <div
          className="col-12 col-md-10 mb-3 p-3"
          >
          <HuntForm />
        </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
