import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from "../Pages/User/Register";
import UserLogin from "../Pages/User/Login";
import FoodPartnerRegister from "../Pages/Food-Partner/Register";
import FoodPartnerLogin from "../Pages/Food-Partner/Login";
import Home from '../Pages/General/Home';
import CreateFood from '../Pages/Food-Partner/CreateFood';
import Profile from '../Pages/Food-Partner/Profile';

const AppRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/user/register" element={<UserRegister />} />
                    <Route path="/user/login" element={<UserLogin />} />
                    <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                    <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                    <Route path="/" element={<Home/>} />
                    <Route path='/create-food' element={<CreateFood/>} />
                    <Route path="/food-partner/:id" element={<Profile />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRoutes
