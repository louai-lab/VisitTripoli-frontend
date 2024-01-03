import axios from "axios";
import React, { useState , useEffect } from "react";
import { Form, ButtonToolbar, Button, Input } from "rsuite";
import { SelectPicker } from "rsuite";
import { toast, ToastContainer } from "react-toastify";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const getImageUrl = (image) => {
  return `http://localhost:4000/images/${image}`;
};

const RowTour = ({
  closeHandler,
  isProfileModalOpen,
  setIsProfileModalOpen,
  tourData,
  setTourData,
}) => {
  const [formData, setFormData] = useState({
    title: tourData.title || "",
    startTime: tourData.startTime || "",
    endTime: tourData.endTime || "",
    price: tourData.price || "",
    image: null,
    userId: tourData.userId || ""
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const filee = e.target.files[0];
    if (filee) {
      setFormData({
        ...formData,
        image: filee,
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
        `${process.env.REACT_APP_BACKEND}/tours/update/${tourData.id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      

      console.log("Update successful", response.data);
      toast.success("Update succsessfully");

      const updatedTourData = response.data;

      // Update the state to reflect the changes
      setTourData(updatedTourData);
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
          backgroundColor: "rgba(49, 72, 101)",
          color: "white",
          zIndex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form>
          <Form.Group controlId="name">
            <Form.ControlLabel>Title</Form.ControlLabel>
            <Form.Control
              name="title"
              defaultValue={tourData.title}
              value={tourData.title}
              onChange={(valuee) => handleInputChange("title", valuee)}
              required={false}
              style={{width: "360px"}}
            />
          </Form.Group>
          <Form.Group controlId="startTime">
            <Form.ControlLabel>Start Date</Form.ControlLabel>
            <Form.Control
              name="startTime"
              type="text"
              defaultValue={tourData.startTime}
              onChange={(value) => handleInputChange("startTime", value)}
              required={false}
              style={{width: "360px"}}
            />
          </Form.Group>
          <Form.Group controlId="endTime">
            <Form.ControlLabel>End Date</Form.ControlLabel>
            <Form.Control
              name="endTime"
              type="text"
              defaultValue={tourData.endTime}
              onChange={(value) => handleInputChange("endTime", value)}
              required={false}
              style={{width: "360px"}}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.ControlLabel>Price</Form.ControlLabel>
            <Form.Control
              name="price"
              type="number"
              defaultValue={tourData.price}
              onChange={(value) => handleInputChange("price", value)}
              required={false}
              style={{width: "360px"}}
            />
          </Form.Group>
          <Form.Group controlId="userId">
            <Form.ControlLabel>User Id</Form.ControlLabel>
            <Form.Control
              name="userId"
              type="number"
              defaultValue={tourData.userId}
              required={false}
              readOnly={true}
              style={{width: "360px"}}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.ControlLabel>Image</Form.ControlLabel>

            <input
            type="file"
            name="image" 
            onChange={handleImageChange}
          />

            {tourData.image && (
              <img
                src={getImageUrl(tourData.image)}
                alt="Tour"
                style={{ maxWidth: "100px", maxHeight: "55px" }}
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

export default RowTour;
