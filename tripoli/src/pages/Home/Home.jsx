import React, { useContext } from "react";
import styles from "./Home.module.css";
import HeroImage from "../../components/heroImage/HeroImage";
import About from "../../components/aboutComponent/About";
import Map from "../../components/Map/Map";
import testImage from "../../components/heroImage/tripoli.jpg";
import TourCard from "../../components/TourCard/TourCard";
import { Link } from "react-router-dom";
import HotelContainer from "../../components/HotelCard/HotelContainer";
import UserContext from "../../useContext/userContext";
import { Helmet } from "react-helmet-async";

function Home({ api, tourApi, hotelapi }) {

  const {user, setUser} = useContext(UserContext)

  console.log(user)

  let newApi = hotelapi.slice(0, 3);
  return (
    <>
      <Helmet>
      <title>Visit Tripoli - Explore its Charm</title>
      <meta name="description" content="Plan your visit to Tripoli, Lebanon, and discover its historical sites, rich culture, and more with Visit Tripoli." />
      <meta name="keywords" content="Visit Tripoli, Lebanon, travel, tourism, culture, history, attractions" />
      </Helmet>
      <HeroImage image={testImage} home={true} />
      <About direction="top" />
      <About direction="bottom" />

      <Map api={api} />
      <h3 className={styles.heading}>Hotel</h3>
      <HotelContainer hotelapi={newApi} />
      <Link to="/hotels" className={styles.link}>
        View more &gt;&gt;
      </Link>
      <h3 className={styles.heading}>Tours</h3>
      <TourCard api={tourApi} home="true" />
      <Link to="/tours" className={styles.link}>
        View more &gt;&gt;
      </Link>
    </>
  );
}

export default Home;
