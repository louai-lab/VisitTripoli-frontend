import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

import Locations from "./pages/locations/Locations";
import React from "react";
import NotFound from "./components/Not Found/NotFound";

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

function App() {
  let [tourApi, setTourApi] = useState([]);
  let [locationApi, setLocationApi] = useState([]);
  let [hotels, setHotels] = useState([]);

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
  }, []);
  return (
    <Routes>
      <Route path="/" element={<ContainerOfThePage />}>
        <Route
          index
          path="/"
          element={
            <Home api={locationApi} tourApi={tourApi} hotelapi={hotels} />
          }
        />
        <Route path="tours" element={<Tour api={tourApi} />} />
        <Route
          path="hotels"
          element={<Hotel hotelapi={hotels} home="false" />}
        />
        <Route path="locations" element={<AllLocations api={locationApi} />} />
        <Route
          path="/Location/:id"
          element={<Locations element={locationApi} />}
        />
      </Route>
      <Route path="/admin/tours" element={<Dashboard />} />
      <Route path="/admin/tours/update/:id" element={<Update />} />
      <Route path="/admin/tours/add" element={<Add />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
