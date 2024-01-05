import React, { useEffect, useState } from "react";
import { Form, ButtonToolbar, Button, Input, SelectPicker } from "rsuite";
import axios from "axios";
import { ToastContainer , toast } from 'react-toastify';

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const FormAdd = ({formData , setFormData , handleAdd , closeHandler , isFormAdd , setIsFormAdd }) => {
  const [imageFile, setImageFile] = useState(null);

  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/user/`
        );
        const allUsers = response.data;
        console.log(allUsers)
        setUsersData(allUsers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const guideUsers = usersData
  .filter(user => user.role === 'guide')
  .map(user => ({ value: user.id, label: user.id }));

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

  return (
    <>
    <ToastContainer/>
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto"
      }}
    >
      <h3 style={{marginTop: "40px"}}>Add A Tour</h3>
      <Form>
        <Form.Group controlId="name">
          <Form.ControlLabel>Title*</Form.ControlLabel>
          <Form.Control name="title" onChange={(value) => handleInputChange("title", value)} />
        </Form.Group>
        <Form.Group controlId="startTime">
          <Form.ControlLabel>Start Date*</Form.ControlLabel>
          <Form.Control name="startTime" onChange={(value) => handleInputChange("startTime", value)} />
        </Form.Group>
        <Form.Group controlId="endTime">
          <Form.ControlLabel>End Date*</Form.ControlLabel>
          <Form.Control name="endTime" onChange={(value) => handleInputChange("endTime", value)} />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.ControlLabel>Price*</Form.ControlLabel>
          <Form.Control name="price" onChange={(value) => handleInputChange("price", value)} />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.ControlLabel>Image*</Form.ControlLabel>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

        {/* <Form.Group controlId="userId">
          <Form.ControlLabel>User Id*</Form.ControlLabel>
          <Form.Control name="userId" onChange={(value) => handleInputChange("userId", value)} />
        </Form.Group> */}

        <Form.Group controlId="userId">
          <SelectPicker
            data={guideUsers}
            placeholder="Select Guide Id"
            name="userId"
            onChange={(value) => handleInputChange("userId", value)}
            menuStyle={{ zIndex: 1005 }}
          />
        </Form.Group>

        <Form.Group style={{marginBottom: "30px"}}>
          <ButtonToolbar>
            <Button
              onClick={handleAdd}
              style={{ backgroundColor: "#BB9463" }}
              appearance="primary"
            >
              Save
            </Button>
            <Button onClick={closeHandler} appearance="default">
              Cancel
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div></>
  );
};

export default FormAdd;
