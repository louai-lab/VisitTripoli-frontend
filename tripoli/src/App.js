import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import UserContext from "./useContext/userContext";
import { Navigate } from "react-router-dom";
import Locations from "./pages/locations/Locations";
import React from "react";
import NotFound from "./components/Not Found/NotFound";
import DashboardLocations from "./components/Dashboard/locations/DashboardLocations";
import DashboardUsers from "./components/Dashboard/users/DashboardUsers";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Tour from "./pages/Tour/Tour";
import Hotel from "./pages/Hotel/Hotel";

import AllLocations from "./pages/AllLocations/AllLocations";
import Dashboard from "./components/Dashboard/Dashboard";
import Add from "./components/Dashboard/Add";
import Update from "./components/Dashboard/Update";
import ContainerOfThePage from "./components/ContainerOfThePage/ContainerOfThePage";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import DashboardPages from "./pages/NewDashbaord/NewDashboard";
import { Test } from "./pages/TestPage/test";

function App() {
  const [user, setUser] = useState(null);
  let [tourApi, setTourApi] = useState([]);
  let [locationApi, setLocationApi] = useState([]);
  let [hotels, setHotels] = useState([]);
  axios.defaults.withCredentials = true

  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/tours`
        );
        setTourApi(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTours();
    async function fetchLocation() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/locations`
        );
        setLocationApi(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLocation();
    async function fetchHotels() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/hotel`
        );
        setHotels(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHotels();

    async function fetchUser(){
    if(!user){
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/user/oneuser`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
  fetchUser()



  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/" element={<Navigate to="/signin" replace />} />

        <Route path="/home" element={<ContainerOfThePage />}>
          <Route
            index
            element={
              <Home api={locationApi} tourApi={tourApi} hotelapi={hotels} />
            }
          />
          <Route path="tours" element={<Tour api={tourApi} />} />
          <Route
            path="hotels"
            element={<Hotel hotelapi={hotels} home="false" />}
          />
          <Route
            path="locations"
            element={<AllLocations api={locationApi} />}
          />
          <Route
            path="Location/:id"
            element={<Locations element={locationApi} />}
          />
        </Route>
        <Route path="/admin/tours" element={<Dashboard />} />
        <Route path="/admin/tours/update/:id" element={<Update />} />
        <Route path="/admin/tours/add" element={<Add />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/dashboard" element={<DashboardPages />}/>
        <Route path="/dashboard/test" element={<DashboardPages> <Test /> </DashboardPages>}/>

        <Route path="/dashboard/locations" element={<DashboardPages> <DashboardLocations /> </DashboardPages>}/>
        <Route path="/dashboard/users" element={<DashboardPages> <DashboardUsers /> </DashboardPages>}/>

      </Routes>
    </UserContext.Provider>
  );
}

export default App;
