import React from "react";
import "../styles/dashboard.css";

const Profile = () => {
  const username = localStorage.getItem("username") || "User";
  const email = localStorage.getItem("email") || "user@email.com";
  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-card">
        <div><b>Name:</b> {username}</div>
        <div><b>Email:</b> {email}</div>
      </div>
    </div>
  );
};

export default Profile;
