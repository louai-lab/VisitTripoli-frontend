import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, ButtonToolbar, Button, Input } from "rsuite";
import { SelectPicker } from "rsuite";
import { toast, ToastContainer } from "react-toastify";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const getImageUrl = (image) => {
  return `http://localhost:4000/images/${image}`;
};

const RowLocation = ({
  closeHandler,
  isProfileModalOpen,
  setIsProfileModalOpen,
  locationData,
  setLocationData,
}) => {
  const [formData, setFormData] = useState({
    name: locationData.name || "",
    image: locationData.image || "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND}/location/update/${locationData.id}`,
        formDataToSend
      );

      console.log("Update successful", response.data);
      toast.success("Update succsessfully");

      const updatedLocationData = response.data;

      // Update the state to reflect the changes
      setLocationData(updatedLocationData);
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    } finally {
      setTimeout(() => {
        setIsProfileModalOpen(false);
      }, 3000);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "600px",
          border: "none",
          backgroundColor: "rgba(49, 72, 101, 0.8)",
          color: "white",
          zIndex: 1003,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form>
          <Form.Group controlId="name">
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Form.Control
              name="name"
              // value={userData.name}
              defaultValue={formData.name}
              onChange={(value) => handleInputChange("name", value)}
              required={false}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.ControlLabel>Image</Form.ControlLabel>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {locationData.image && (
              <img
                src={getImageUrl(locationData.image)}
                alt="User"
                style={{ maxWidth: "100%", maxHeight: "150px" }}
              />
            )}
          </Form.Group>

          <Form.Group>
            <ButtonToolbar>
              <Button
                onClick={handleUpdate}
                appearance="primary"
                style={{ backgroundColor: "#BB9463" }}
              >
                Save
              </Button>
              <Button appearance="default" onClick={closeHandler}>
                Cancel
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default RowLocation;