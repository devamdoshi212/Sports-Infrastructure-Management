import { useState } from "react";
import { useCookies } from "react-cookie";
import { redirect } from "react-router-dom";
import Login from "../../Pages/Login";

const Verify = async (role) => {
  const token = localStorage.getItem("token");
  if (token === null) {
    return redirect("/login");
  } else {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      token: token,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "http://localhost:9999/verify",
      requestOptions
    );
    const result = await response.json();
    if (result.rcode === 200) {
      if (result.data.Role == role) {
        return null;
      } else {
        return redirect("/");
      }
    }
  }
};

export default Verify;
