import "./App.css";
import "rsuite/dist/rsuite.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import UserContext from "./useContext/userContext";
import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";
import FavIcon from "./images/favicon.png";

// import NetworkError from "./pages/NetworkError/NetworkError.";
import AppRoutes from "./AppRoutes.js";

function App() {
  const [user, setUser] = useState(null);
  let [tourApi, setTourApi] = useState([]);
  let [locationApi, setLocationApi] = useState([]);
  let [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  axios.defaults.withCredentials = true;

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

    async function fetchUser() {
      if (!user) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND}/user/oneuser`
          );
          setUser(response.data);
          setIsLoading(false)
        } catch (error) {
          console.error(error);
          setIsLoading(false)
        }
      }
    }
    fetchUser();
  }, []);
  return (
    <HelmetProvider>
      <Helmet>
        <link rel="shortcut icon" href={FavIcon} type="image/x-icon" />
      </Helmet>
    {!isLoading &&
      <UserContext.Provider value={{ user, setUser }}>
        <AppRoutes hotels={hotels} tourApi={tourApi} locationApi={locationApi}  />
      </UserContext.Provider>
      }
    </HelmetProvider>
  );
}

export default App;


{/* <HelmetProvider>
      <Helmet>
        <link rel="shortcut icon" href={FavIcon} type="image/x-icon" />
      </Helmet>

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
        </Routes>
      </UserContext.Provider>
    </HelmetProvider> */}
