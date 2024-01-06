import React from "react";
import hotel from "../../images/hotel.jpeg";
import HeroImage from "../../components/heroImage/HeroImage";
import HotelContainer from "../../components/HotelCard/HotelContainer";
import { Helmet } from "react-helmet-async";

function Hotel({ hotelapi }) {
  return (
    <div>
      <Helmet>
      <title>Visit Tripoli - Explore its Hotels</title>
      <meta name="description" content="Plan your visit to Tripoli, Lebanon, and discover the best locations to take a rest, good view , and more with Visit Tripoli." />
      <meta name="keywords" content="Visit Tripoli, Lebanon, travel, tourism, culture, hotel , view , service , history, attractions" />
      </Helmet>
      <HeroImage image={hotel} hotels={true} />
      <HotelContainer hotelapi={hotelapi} />
    </div>
  );
}

export default Hotel;
