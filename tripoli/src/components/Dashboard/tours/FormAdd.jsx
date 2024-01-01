import React, { useEffect, useState } from "react";
import { Form, ButtonToolbar, Button, Input, SelectPicker } from "rsuite";
import axios from "axios";
import { ToastContainer , toast } from 'react-toastify';

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const FormAdd = ({formData , setFormData , handleAdd , closeHandler , isFormAdd , setIsFormAdd }) => {
  const [imageFile, setImageFile] = useState(null);

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
        backgroundColor: "rgba(49, 72, 101, 0.8)",
        color: "white",
        zIndex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Add User</h3>
      <Form>
        <Form.Group controlId="name">
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name="name" onChange={(value) => handleInputChange("name", value)} />
          <Form.HelpText>Username is required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" onChange={(value) => handleInputChange("email", value)} type="email" />
          <Form.HelpText tooltip>Email is required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control name="password" type="password" onChange={(value) => handleInputChange("password", value)} autoComplete="off" />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.ControlLabel>Image</Form.ControlLabel>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

        <Form.Group>
          <SelectPicker
            data={[
              // { value: "guide", label: "Guide" },
              { value: "admin", label: "Admin" },
            ]}
            placeholder="Select Role"
            name="role"
            onChange={(value) => handleInputChange("role", value)}
          />
        </Form.Group>

        <Form.Group>
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
