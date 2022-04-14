import { useState, useEffect } from "react";
import React, { Component }  from 'react';
import axios from "axios";
const Profile = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  
    //var vendoremail = sessionStorage.getItem("name")
    setEmail("vendoremail");
    const newUser = {
      email: email,
    };

    return <div style={{ textAlign: "center" }}>Happy Coding - {"vendoremail"}</div>;
  };

  export default Profile;