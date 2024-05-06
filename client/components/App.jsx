import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Registration from './Registration.jsx';
import SignIn from './SignIn.jsx';
import Shop from './Shop.jsx';
import Profile from './Profile.jsx'
import AdminMenu from './AdminMenu.jsx';

function App () {
  return (
    <>
        <Routes >
            <Route path="/" exact element={<Home />} />
            <Route path="/registration" exact element={<Registration />} />	
            <Route path="/signin" exact element={<SignIn />} />
            <Route path="/shop" exact element={<Shop />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/admin-menu" exact element={<AdminMenu />} />
        </Routes>
    </>
  );
};

export default App