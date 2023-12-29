import React from "react";
import HeroImageCSS from "./HeroImage.module.css";
import Typed from "typed.js";
import homeImage from "../heroImage/home.jpg";
import locationsImage from "../heroImage/locations.jpg";
import hotelsImage from "../heroImage/hotels.jpeg";
import toursImage from "../heroImage/tours.jpg";

export default function HeroImage(props) {
  const image = props.image;
  let ishome = props.home;
  let islocations = props.locations;
  let ishotels = props.hotels;
  let istours = props.tours;
  let myurl = `${process.env.REACT_APP_BACKEND}/${image}`;
  let mystrings = [];

  if (ishome) {
    myurl = homeImage;
    mystrings.push("| Welcome to Tripoli!");
    mystrings.push("| Discover the hidden gem of Lebanon...");
    mystrings.push("| Home Page...");
  }
  if (islocations) {
    myurl = locationsImage;
    mystrings.push("| Discover Tripoli's sites...");
    mystrings.push("| Discover the hidden gem of Lebanon...");
    mystrings.push("| Locations Page ..|");
  }
  if (ishotels) {
    myurl = hotelsImage;
    mystrings.push("| Choose where you want to stay!");
    mystrings.push("| Best Hotels in Tripoli");
    mystrings.push("| Hotels Page ...");
  }
  if (istours) {
    myurl = toursImage;
    mystrings.push("| Plan your local tour!");
    mystrings.push("| Checkout the tours in Tripoli...");
    mystrings.push("| Tours Page ...");
  }
  if (props.whichLocation) {
    mystrings.push(`| ${props.whichLocation.title}`);
    mystrings.push(`| ${props.whichLocation.smallDescription}`);
    mystrings.push(`| ${props.whichLocation.title}`);
  }
  const imageCSS = {
    background: `url(${myurl}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
  };

  let title = props.mytitle;

  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: mystrings,
      typeSpeed: 80,
      backSpeed: 50,
      loop: false,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className={HeroImageCSS.heroImageContainer} style={imageCSS}>
      <div className={HeroImageCSS.overlayCSS}>
        <span ref={el} className={HeroImageCSS.textAnimation} />
      </div>
    </div>
  );
}
