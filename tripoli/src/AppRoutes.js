import "./App.css";
import "rsuite/dist/rsuite.min.css";
import { Navigate } from "react-router-dom";
import Locations from "./pages/locations/Locations";
import React, { useContext } from "react";
import DashboardLocations from "./components/Dashboard/locations/DashboardLocations";
import DashboardUsers from "./components/Dashboard/users/DashboardUsers";
import NotFound from "./pages/NotFound/NotFound";

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
import ProtectedRoute from "./ProtectedRoutes";
import UserContext from "./useContext/userContext";
import DashboardTours from "./components/Dashboard/tours/DashboardTours";
import Profile from "./pages/Profile/Profile";
import NotAuthorised from "./NotAuthorised";

function AppRoutes({locationApi, tourApi,hotels}) {
    const {user} = useContext(UserContext)
    console.log(user)
  return (
    <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route element={<ProtectedRoute isAllowed={user}/>}>
          <Route path="/home" element={  <ContainerOfThePage /> }>
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
              path="location/:id"
              element={<Locations element={locationApi} />}
              />
              </Route>
          </Route>
          <Route path="/admin/tours" element={<Dashboard />} />
          <Route path="/admin/tours/update/:id" element={<Update />} />
          <Route path="/admin/tours/add" element={<Add />} />
          <Route path="/*" element={<NotFound />} />

              <Route element={<ProtectedRoute isAllowed={user && user.role === 'admin'} redirectPath='/home'/>}>

          <Route
            path="/dashboard"
            element={
                <DashboardPages>
                {" "}
                <DashboardLocations />{" "}
              </DashboardPages>
            }
            />
          <Route
            path="/dashboard/locations"
            element={
                <DashboardPages>
                {" "}
                <DashboardLocations />{" "}
              </DashboardPages>
            }
            />
          <Route
            path="/dashboard/users"
            element={
                <DashboardPages>
                {" "}
                <DashboardUsers />{" "}
              </DashboardPages>
            }
            />
          <Route
            path="/dashboard/tours"
            element={
              <DashboardPages>
                {" "}
                <DashboardTours />{" "}
              </DashboardPages>
            }
            />
          <Route
            path="/dashboard/profile"
            element={
                <DashboardPages>
                {" "}
                <Profile />{" "}
              </DashboardPages>
            }
            />
            </Route>
            <Route path="/notAuthorised" element={<NotAuthorised />}/>
        </Routes>
  )
}

export default AppRoutes
