import React from "react";
import HeroImage from "../../components/heroImage/HeroImage";
import TourCard from "../../components/TourCard/TourCard";
import tour from "../../images/tripoli.jpg";
import { Helmet } from "react-helmet-async";

function Tour({ api }) {
  return (
    <>
      <Helmet>
        <title>Visit Tripoli - Explore its famous places</title>
        <meta
          name="description"
          content="Plan your visit to Tripoli, Lebanon, and discover its historical places, rich culture, and more with Visit Tripoli."
        />
        <meta
          name="keywords"
          content="Visit Tripoli, tour , visit , tours , Lebanon, travel, tourism, culture, history, attractions"
        />
      </Helmet>
      <HeroImage image={tour} tours={true} />
      <TourCard api={api} home="false" />
    </>
  );
}

export default Tour;
