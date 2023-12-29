import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Dash.module.css";

function Add() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/tours/add`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Item added");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Item not added");
    }
  };

  return (
    <main id={styles["siteMain"]}>
      <div className={styles.containerDash}>
        <div
          className={`${styles.boxNav} ${styles.dFlex} ${styles.justifyBewteen}`}
        >
          <div className={styles.filter}>
            <Link to="/admin/tours">
              <i className="fas fa-angle-double-left"></i> All Tours
            </Link>
          </div>
        </div>
        <div className={`${styles.formTitle} ${styles.textCenter}`}>
          <h2 className={styles.textDark}>New Tour</h2>
          <span className={styles.textLight}>
            Use the form below to create a new Tour
          </span>
        </div>
        <form id={styles["addHeritage"]} encType="multipart/form-data">
          <div className={styles.newHeritage}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.textLight}>
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="title"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.textLight}>
                Description
              </label>
              <input
                type="text"
                name="description"
                placeholder="description"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="link" className={styles.textLight}>
                Link
              </label>
              <input
                type="text"
                name="link"
                placeholder="https://www.google.com"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="image" className={styles.textLight}>
                Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <button
                type="submit"
                className={`${styles.btn} ${styles.textDark} ${styles.update}`}
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Add;
