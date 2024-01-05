import { React, useContext, useState } from "react";
import style from "./SignIn.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import eye from "../../images/eye.png";
import hide from "../../images/hide.png";
import { toast, ToastContainer } from "react-toastify";
import UserContext from "../../useContext/userContext";
import OAuth from "../../OAuth/OAuth";

function SignIn() {
  const { user , setUser } = useContext(UserContext)
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const visiblePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (credentials.email === "" || credentials.password === "") {
      return toast.error("All fields are required");
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        credentials
      );

      if (response.data) {
        // console.log(response.data);
        setUser(response.data)

        // Save user data to local storage
        localStorage.setItem("userData", JSON.stringify(true));
        toast.success("Login successfully")
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 3000);
      }
      
    } catch (error) {
      // if (error.response.status === 401) {
      //   toast.error("Incorrect email or password");
      // } else {
      //   toast.error("An error occurred. Please try again.");
      // }
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <main className={style.main}>
        <div className={style.imageContainer}></div>

        <div style={{ margin: "50px auto", display: "flex" }}>
          <div className={style.content}>
            <div className={style.text}>
              <h1 className={style.mainTitle}>Sign in to Exclusive</h1>
              <p className={style.slogan}>Enter your details below</p>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className={style.input}>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
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
                  value={credentials.password}
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

              <Link to={"/"}>
                <input
                  type="submit"
                  onClick={handleSubmit}
                  value="Sign In"
                  className={style.submitBtn}
                />
              </Link>
              <OAuth signup={false}/>
            </form>
            <p className={style.loginP}>
              Don't have an account?
              <span className={style.login}>
                <Link to={"/signup"}>Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignIn;
