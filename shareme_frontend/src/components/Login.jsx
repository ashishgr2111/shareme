import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import jwt_decode from "jwt-decode";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  window.handleCredentialResponse = (response) => {
    const responsePayload = jwt_decode(response.credential);
    // console.log("ID: " + responsePayload.sub);
    // console.log("Full Name: " + responsePayload.name);
    // console.log("Given Name: " + responsePayload.given_name);
    // console.log("Family Name: " + responsePayload.family_name);
    // console.log("Image URL: " + responsePayload.picture);
    // console.log("Email: " + responsePayload.email);

    localStorage.setItem("user", JSON.stringify(responsePayload));
    const { name, sub: googleId, picture: imageUrl } = responsePayload;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <Helmet>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Helmet>
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div
            id="g_id_onload"
            data-client_id={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            data-auto_prompt="false"
            data-callback="handleCredentialResponse"
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-size="large"
            data-theme="outline"
            data-text="sign_in_with"
            data-shape="rectangular"
            data-logo_alignment="left"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
