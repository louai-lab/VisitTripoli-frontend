import React from "react";
import hotel from "../../images/hotel.jpeg";
import HeroImage from "../../components/heroImage/HeroImage";
import HotelContainer from "../../components/HotelCard/HotelContainer";

function Hotel({ hotelapi }) {
  return (
    <div>
      <HeroImage image={hotel} hotels={true} />
      <HotelContainer hotelapi={hotelapi} />
    </div>
  );
}

export default Hotel;
