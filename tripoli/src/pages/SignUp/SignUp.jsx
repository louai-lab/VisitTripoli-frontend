import {React, useState} from "react";
import style from './SignUp.module.css';
import { Link } from "react-router-dom";
import axios from "axios";
import googleIcon from '../../images/google.png';
import eye from '../../images/eye.png'
import hide from '../../images/hide.png'

function SignUp() {
  const [imageFile, setImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleimageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const visiblePassword = () => {
    setShowPassword(!showPassword)
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

      setFormData({
        ...formData,
        [name]: value,
      });
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const formDataToSend = new FormData();
      formDataToSend.append('Name', formData.name);
      formDataToSend.append('Email', formData.email);
      formDataToSend.append('Password', formData.password);
    
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
    
      try {
        const response = await axios.post('http://localhost:4000/user/add', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <main className={style.main}>
      <div className={style.imageContainer}></div>
      <div className={style.content}>
        <div className={style.text}>
          <h1 className={style.mainTitle}>Create an account</h1>
          <p className={style.slogan}>Enter your details below</p>
        </div>
        <form onClick={handleSubmit}>
          <div className={style.input}>
            <input type="text" name="Name" value={formData.name} onChange={handleInputChange} placeholder="Name *" required/>
          </div>
          <div className={style.input}>
            <input type="email" name="Email" value={formData.email} onChange={handleInputChange} placeholder="Email *" required/>
          </div>
          <div className={`${style.input} ${style.passwordInput}`}>
            <input type={showPassword ? "text" : "password"} name="Password" onChange={handleInputChange} value={formData.password} placeholder="Password *" required/>
            <img
              src={showPassword ? hide : eye}
              className={style.icon}
              alt="Hide and Show an Eye"
              onClick={visiblePassword}
            />
          </div>
          <div className={`${style.input} ${style.picture}`}>
          <label htmlFor="imageUpload" className={style.imageLabel}>Insert Your image</label>
          <input
            type="file"
            id="imageUpload"
            name="image" 
            value={formData.image}
            className={style.uploadImageInput}
            onChange={handleimageChange}
          />
          </div>
          <input type="submit" value="Create Account" className={style.submitBtn} onClick={handleSubmit} />
        </form>
        <div className={style.googleButton}>
          <img src={googleIcon} alt="Google Icon" className={style.googleIcon}/>
          <p className={style.slogan}>Sign up with Google</p>
        </div>
        <p className={style.loginP}>
          Already have account? 
          <span className={style.login}><Link to={"/signin"}>LogIn</Link></span>
        </p>
      </div>
    </main>
  );
}

export default SignUp;
