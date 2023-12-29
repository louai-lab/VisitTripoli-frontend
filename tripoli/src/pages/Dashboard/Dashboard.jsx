import React, { useEffect, useState } from "react";
import styles from "./Dash.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  let [tourApi, setTourApi] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/tours`
        );
        setTourApi(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [tourApi]);
  if (!tourApi || tourApi.length === 0) {
    return <div className={styles.loading}>loading...</div>;
  }
  const keys = Object.keys(tourApi[0]);
  return (
    <main id={styles["siteMain"]}>
      <div className={styles.containerDash}>
        <div
          className={`${styles.boxNav} ${styles.dFlex} ${styles.justifyBewteen}`}
        >
          <Link to="/admin/tours/add" className={styles.borderShadow}>
            <span className={styles.textGradient}>
              New Tour <i className="fa-solid fa-user"></i>
            </span>
          </Link>
        </div>
        <form action="/admin/tours" method="POST">
          <table className={styles.table}>
            <thead className={styles.theadDark}>
              <tr>
                {keys.map((element, index) => {
                  return <th key={index}>{element}</th>;
                })}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tourApi.map((element, index) => {
                return (
                  <tr key={index}>
                    {keys.map((key) => (
                      <td key={key}>{element[key]}</td>
                    ))}
                    <td>
                      <Link
                        // /admin/update/:id
                        to={`/admin/tours/update/${element.id}`}
                        className={`${styles.btn} ${styles.borderShadow} ${styles.update}`}
                      >
                        <span className={styles.textGradient}>
                          <i className="fas fa-pencil-alt"></i>
                        </span>
                      </Link>
                      <a
                        onClick={async () => {
                          let response = await axios.delete(
                            `${process.env.REACT_APP_BACKEND}/tours/delete/${element.id}`
                          );
                          alert("Data is deleted");
                        }}
                        className={`${styles.btn} ${styles.borderShadow} ${styles.delete}`}
                      >
                        <span className={styles.textGradient}>
                          <i className="fas fa-times"></i>
                        </span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </div>
    </main>
  );
}

export default Dashboard;
