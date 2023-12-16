import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import FileUploadComponent from "../../pages/FileUpload/FileUploadComponent";
import { auth } from "../../firebase";

const Home = ({ name }) => {
  const renderUserOptions = () => {
    return (
      <div className={styles.UserOptions}>
        <h3>Welcome - {name}</h3>
      </div>
    );
  };
  const handleLogout = async () => {
    var userChoice = window.confirm("Do you want to proceed?");
    if (userChoice) {
      try {
        await auth.signOut();
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }

  };

  return (
    <div>
      <header className={styles.header}>
        {renderUserOptions()}
        <div className={styles.OutPro}>
          <div onClick={handleLogout} className={styles.logout}>
            <p>
            Logout
            </p>
          </div>
          <h1>
            <Link className={styles.Link} to="/profile">
              Profile
            </Link>
          </h1>
          <div className={styles.user}>{name?.charAt(0).toUpperCase()}</div>
        </div>
      </header>
      <main className={styles.main}>
        <FileUploadComponent />
      </main>
    </div>
  );
};

export default Home;
