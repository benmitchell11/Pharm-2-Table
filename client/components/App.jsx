import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Registration from './Registration.jsx';
import SignIn from './SignIn.jsx';
import Shop from './Shop.jsx';
import Profile from './Profile.jsx'
import Prescriptions from './Prescriptions.jsx';
import UserOrders from './UserOrders.jsx';
import ManageUsers from './ManageUsers.jsx';
import AddProducts from './AddProducts.jsx'
import PendingApplications from './PendingApplications.jsx';
import ProductStatistics from './ProductStatistics.jsx';
import PendingOrders from './PendingOrders.jsx';
import PendingPrescriptions from './PendingPrescriptions.jsx';
import AddSupplier from './AddSupplier.jsx';
import Contact from './Contact.jsx';
import About from './About.jsx'
import Product from './Product.jsx';

function App () {
  return (
    <>
        <Routes >
            <Route path="/" exact element={<Home />} />
            <Route path="/registration" exact element={<Registration />} />	
            <Route path="/signin" exact element={<SignIn />} />
            <Route path="/shop" exact element={<Shop />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/prescriptions" exact element={<Prescriptions />} />
            <Route path="/user-orders" exact element={<UserOrders />} />
            <Route path="/manage-users" exact element={<ManageUsers />} />
            <Route path="/add-products" exact element={<AddProducts />} />
            <Route path="/pending-applications" exact element={<PendingApplications />} />
            <Route path="/product-statistics" exact element={<ProductStatistics />} />
            <Route path="/pending-orders" exact element={<PendingOrders />} />
            <Route path="/pending-prescriptions" exact element={<PendingPrescriptions />} />
            <Route path="/add-supplier" exact element={<AddSupplier />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/product/:id" exact element={<Product />} />
        </Routes>
    </>
  );
};

export default App