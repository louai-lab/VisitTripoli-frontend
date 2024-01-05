import React, { useState, useEffect } from 'react';
import style from './Profile.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/oneuser`);
        const data = response.data
        setData(data);
        console.log('Data Reaponse:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  let imageSRC = '';

  if (data && data.image) {
    imageSRC = data.image.startsWith('image')
      ? `${process.env.REACT_APP_BACKEND}/images/${data.image}`
      : data.image;
  }

  return (
    <div className={style.main}>
      <div className={style.header}>
        <h1 className={style.title}>User info</h1>
      </div>
      <div className={style.tableContainer}>
        <table className={style.dataTable}>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{data.email}</td>
            </tr>
            <tr>
              <td>Role:</td>
              <td>{data.role}</td>
            </tr>
            <tr>
              <td>Image:</td>
              <td><img src={imageSRC} className={style.logoImage} alt="Profile Image" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
