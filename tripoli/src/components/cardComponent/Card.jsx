import LocationIcon from "../vector/LocationIcon";
import style from "./card.module.css";
import CarIcon from "../vector/CarIcon";
import Star from "..//SVGComponents/Star";
import { Link } from "react-router-dom";

const Card = ({ data, type }) => {
  let cardImage = "";
  let cardTime = "";
  let cardRating = "";
  let locationId = data._id;
  if (type === "hotel") {
    cardImage = data.image;
    cardTime = data.time;
    cardRating = data.rating;
  }
  if (type === "location") {
    cardImage = data.heroImage;
    cardTime = data.timeFromCenter;
    cardRating = data.googleRating;
  }
  return (
    <div>
      <div className={style.card}>
        <div className={style.overflow}>
          {type === "hotel" ? (
            <a
              href={data.link}
              target="_blank"
              className={style.goToHotel}
              rel="noreferrer"
            >
              <img
                src={`${process.env.REACT_APP_BACKEND}/${cardImage}`}
                alt="hotel_image"
                className={style.hotelImg}
              />
            </a>
          ) : (
            <Link
              to={`/location/${locationId}`}
              className={style.goToHotel}
              rel="noreferrer"
            >
              <img
                src={`${process.env.REACT_APP_BACKEND}/${cardImage}`}
                alt="hotel_image"
                className={style.hotelImg}
              />
            </Link>
          )}
        </div>
        <div className={style.information}>
          <p className={style.title}>{data.title}</p>
          <div className={style.LocationIconStyle}>
            <LocationIcon />
            <p className={style.location}>{data.address}</p>
          </div>
          <div className={style.CarIconStayle}>
            <CarIcon />
            <p className={style.time}>
              {cardTime} {type === "hotel" ? <>min</> : ""}
            </p>
          </div>
          <div className={style.priceButton}>
            <div className={style.starRating}>
              <Star color="#ffd700" />
              <p className={style.price}>{cardRating}</p>
            </div>
            {type === "hotel" ? (
              <a
                href={data.link}
                target="_blank"
                className={style.goToHotel}
                rel="noreferrer"
              >
                <button className={style.buttonView}>View</button>
              </a>
            ) : (
              <Link
                to={`/location/${locationId}`}
                className={style.goToHotel}
                rel="noreferrer"
              >
                <button className={style.buttonView}>View</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
