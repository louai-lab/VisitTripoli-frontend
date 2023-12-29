import image1 from "../../images/55.jpg"
import style from "./About.module.css";
import image2 from "../../images/Tripoli-Cityscape.jpg"
const About = (props) => {
  let direction = props.direction;

  return (
    <>
      <div
        className={`${direction === "top" ? style.RowDisplay : style.RowReverseDisplay
          }`}
      >
        {direction === "top" ? <img src={image1} className={style.aboutImage} alt="about" /> : <img src={image2} className={style.aboutImage} />}
        <div>
          {direction === "top" ? <h1 className={style.title}>ABOUT VISITRIPOLI</h1> : <h1 className={style.title}>JEWEL OF THE MEDITERRANEAN</h1>}
          {direction == "top" ? (
            <p className={style.paragAbout}>
              Welcome to Discovering Tripoli's Heritage, a platform dedicated to
              showcasing the cultural and historical marvels of Tripoli,
              Lebanon. Our aim is to take you on a virtual journey through the
              ancient past and vibrant present of this captivating city,
              shedding light on its diverse heritage and timeless beauty.
            </p>
          ) : (
            <p className={style.paragAbout}>
              Located at the northern tip of the city, this park offers a
              panoramic view of the Mediterranean Sea and the cityscape. It's an
              excellent spot for a relaxing afternoon and watching the sunset.
            </p>
          )}
        </div>
      </div>
      <hr className={`${direction === "top" ? style.line : style.remove}`} />
    </>
  );
};
export default About;
