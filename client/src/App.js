import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SingleHunt from './pages/SingleHunt';

import Header from './components/Header';
// import Footer from './components/Footer';
import HuntList from './components/HuntList';

import Image from './assets/scavenger-backgroud.jpg'

import Paper from '@mui/material/Paper';
import Scroll from './assets/paper-scroll.png'

import ScrollTop from './assets/paper-scroll-top.png'
import ScrollMid from './assets/paper-scroll-mid.png'
import ScrollBot from './assets/paper-scroll-bottom.png'


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const style = {
  background: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
}

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Paper style={style.background}>
        <div className="flex-column justify-flex-start">
          <Header />
      <div className="container" style={{paddingTop: "15%", backgroundImage: `url(${ScrollTop})`,  backgroundSize: "100% 100%", backgroundRepeat: "no-repeat"}}>
      <p> </p>
      </div>
          <div className="container" style={{backgroundRepeat: "no-repeat", backgroundImage: `url(${ScrollMid})`, backgroundSize: "100% 100%"}}>
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
              <Route 
                path="/login"
                element={<Login />}
              />
              <Route 
                path="/signup"
                element={<Signup />}
              />
              <Route 
                path="/me"
                element={<Profile />}
              />
              <Route 
                path="/profiles/:username"
                element={<Profile />}
              />
              <Route 
                path="hunts"
                element={<HuntList />}
              />
              <Route 
                path="hunts/:huntId"
                element={<SingleHunt />}
              />
              
            </Routes>
            </div>
          <div className="container" style={{paddingBottom:"15%", backgroundImage: `url(${ScrollBot})`,  backgroundSize: "100% 100%", backgroundRepeat: "no-repeat"}}>
          <p></p>
          </div>
          </div>
          </Paper>
        </Router>
    </ApolloProvider>
  );
}

export default App;
