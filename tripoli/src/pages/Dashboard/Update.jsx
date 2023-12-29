import React, { useEffect } from "react";
import axios from "axios";
import styles from "./Dash.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Update() {
  let { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });
  let [tourApi, setTourApi] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/tours`
        );
        return setTourApi(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    tourApi.map((element) => {
      if (element.id == id) {
        setFormData({
          ...formData,
          title: element.title,
          description: element.description,
          link: element.link,
          image: element.image,
        });
      }
    });
  }, [tourApi]);

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
      let formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("image", formData.image);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND}/tours/update/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Item Updated");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Item not Updated");
    }
  };
  if (!tourApi || tourApi.length === 0) {
    return <div className={styles.loading}>loading...</div>;
  }
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
          <h2 className={styles.textDark}>Update a Tour</h2>
          <span className={styles.textLight}>
            Use The below form to update a Tour
          </span>
        </div>
        <form id={styles["updateHeritage"]} encType="multipart/form-data">
          <div className={styles.newHeritage}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.textLight}>
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
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
                value={formData.description}
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
                value={formData.link}
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

export default Update;
