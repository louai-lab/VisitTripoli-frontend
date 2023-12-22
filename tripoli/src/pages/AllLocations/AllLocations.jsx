import React, { useState , useContext } from "react";
import Button from "../../components/buttonLocation/Button";
import HeroImage from "../../components/heroImage/HeroImage";
import heroTestImage from "../../components/heroImage/tripoli.jpg";
import ContainerLocation from "../../components/containerLocation/ContainerLocation";
import UserContext from "../../useContext/userContext";

export default function AllLocations(props) {
  const [whichButtonClicked, setWhichButtonClicked] = useState("");

  const { user } = useContext(UserContext);

  // console.log(user)
  

  const api = props.api;
  let idOne = [];
  let idTwo = [];
  let idThree = [];

  let idOneAll = [];
  let idTwoAll = [];
  let idThreeAll = [];

  

  const map = api.map((element) => {
    if (element.id == 1) {
      idOne.push(element);
      idOneAll.push(element);
    } else if (element.id == 2) {
      idTwo.push(element);
      idTwoAll.push(element);
    } else if (element.id == 3) {
      idThree.push(element);
      idThreeAll.push(element);
    }
  });

  if (idOne.length > 3) {
    idOne = idOne.slice(0, 3);
  }
  if (idTwo.length > 3) {
    idTwo = idTwo.slice(0, 3);
  }
  if (idThree.length > 3) {
    idThree = idThree.slice(0, 3);
  }

  return (
    <>
      <HeroImage image={heroTestImage} locations={true}></HeroImage>
      <Button buttonPressed={setWhichButtonClicked} />
      {whichButtonClicked ? (
        whichButtonClicked == 1 ? (
          <ContainerLocation
            elementArray={idOneAll}
            sentence="Discover Tripoli's Monuments"
            vector="monuments"
          />
        ) : whichButtonClicked == 2 ? (
          <ContainerLocation
            elementArray={idTwoAll}
            sentence="Discover Tripoli's Activities"
            vector="activities"
          />
        ) : whichButtonClicked == 3 ? (
          <ContainerLocation
            elementArray={idThreeAll}
            sentence="Discover Tripoli's places of worship"
            vector="worshop"
          />
        ) : null
      ) : (
        <>
          <ContainerLocation
            elementArray={idOne}
            sentence="Discover Tripoli's Monuments"
            vector="monuments"
          />
          <ContainerLocation
            elementArray={idTwo}
            sentence="Discover Tripoli's Activities"
            vector="activities"
          />
          <ContainerLocation
            elementArray={idThree}
            sentence="Discover Tripoli's places of worship"
            vector="worshop"
          />
        </>
      )}
    </>
  );
}
