import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profilestyle from "./Profile.module.css";

function Profile({ setUserName }) {
  const [newName, setNewName] = useState("");

  const handleChangeName = () => {
    setUserName(newName);
    alert("Ism o'zgartirildi");
  };

  return (
    <div>
      <header className={Profilestyle.header}>
        <h4>Edit Profile</h4>
        <Link className={Profilestyle.Homelink} to="/home">
          Home
        </Link>
      </header>
      <main className={Profilestyle.body}>
        <h4 className={Profilestyle.setNewName}>Set New Name</h4>
        <input
          className={Profilestyle.input}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name"
        />
        <button
          className={Profilestyle.Button}
          type="button"
          onClick={handleChangeName}
        >
          Change Name
        </button>
      </main>
    </div>
  );
}

export default Profile;
