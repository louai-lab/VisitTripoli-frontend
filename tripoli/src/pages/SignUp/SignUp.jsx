import { React, useState , useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import style from "./SignUp.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../images/google.png";
import eye from "../../images/eye.png";
import hide from "../../images/hide.png";
import UserContext from "../../useContext/userContext";

import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const { user , setUser } = useContext(UserContext)
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleimageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const visiblePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form fields
  if (!formData.name || !formData.email || !formData.password) {
    toast.error("Please fill in all required fields.");
    return;
  }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND}/user/register`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUser(response.data)
        toast.success("Signup successful!");

        
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Signup failed. Please try again.");
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />

      <main className={style.main}>
        <div className={style.imageContainer}></div>

        <div style={{margin:"50px auto" , display:"flex"}}>
          <div className={style.content}>
            <div className={style.text}>
              <h1 className={style.mainTitle}>Create an account</h1>
              <p className={style.slogan}>Enter your details below</p>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className={style.input}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name *"
                  required
                />
              </div>
              <div className={style.input}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email *"
                  required
                />
              </div>
              <div className={`${style.input} ${style.passwordInput}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  placeholder="Password *"
                  required
                />
                <img
                  src={showPassword ? hide : eye}
                  className={style.icon}
                  alt="Hide and Show an Eye"
                  onClick={visiblePassword}
                />
              </div>
              <div className={`${style.input} ${style.picture}`}>
                <label htmlFor="imageUpload" className={style.imageLabel}>
                  Insert Your image
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  name="image"
                  value={formData.image}
                  className={style.uploadImageInput}
                  onChange={handleimageChange}
                />
              </div>
              <Link to={"/"}>
                <input
                  type="submit"
                  onClick={handleSubmit}
                  value="Create Account"
                  className={style.submitBtn}
                />
              </Link>
            </form>
            <div className={style.googleButton}>
              <img
                src={googleIcon}
                alt="Google Icon"
                className={style.googleIcon}
              />
              <p className={style.slogan}>Sign up with Google</p>
            </div>
            <p className={style.signinP}>
              Already have account?
              <span className={style.signin}>
                <Link to={"/signin"}>SignIn</Link>
              </span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignUp;
