import {React, useState} from "react";
import style from './SignIn.module.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import googleIcon from '../../images/google.png';
import eye from '../../images/eye.png'
import hide from '../../images/hide.png'

function SignIn() {
  const navigate = useNavigate()
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
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
    
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
    
      try {
        const response = await axios.post('http://localhost:4000/user/register', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response:', response.data);
        return navigate('/', { replace: true })
        return 
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <main className={style.main}>
      <div className={style.imageContainer}></div>
      <div className={style.content}>
        <div className={style.text}>
          <h1 className={style.mainTitle}>Sign in to Exclusive</h1>
          <p className={style.slogan}>Enter your details below</p>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={style.input}>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email *" required/>
          </div>
          <div className={`${style.input} ${style.passwordInput}`}>
            <input type={showPassword ? "text" : "password"} name="password" onChange={handleInputChange} value={formData.password} placeholder="Password *" required/>
            <img
              src={showPassword ? hide : eye}
              className={style.icon}
              alt="Hide and Show an Eye"
              onClick={visiblePassword}
            />
          </div>
          <Link to={"/"}>
            <input type="submit" onClick={handleSubmit} value="Sign In" className={style.submitBtn} />
          </Link>
        </form>
        <div className={style.googleButton}>
          <img src={googleIcon} alt="Google Icon" className={style.googleIcon}/>
          <p className={style.slogan}>Sign in with Google</p>
        </div>
        <p className={style.loginP}>
          Don't have an account?
          <span className={style.login}><Link to={"/signin"}>Sign up</Link></span>
        </p>
      </div>
    </main>
  );
}

export default SignIn;
