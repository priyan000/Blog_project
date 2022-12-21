import React from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  //   console.log(children);
  //   const LoginDetails = useSelector((state) => state.LoginDetails);
  //   console.log(LoginDetails);

  const logindata = localStorage.getItem("SigninResponse");

  if (!logindata) {
    return <Navigate to="/" />;
  }
  return children;
}

export default RequireAuth;
