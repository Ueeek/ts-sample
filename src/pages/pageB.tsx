import React,{useContext}from "react";
import {Link} from "react-router-dom"
import{SessionContext} from "../common"
export const PageB = () => {
  const loginContext = useContext(SessionContext);


  return (
    <div>
      <h2> Hello from page B</h2>
      <h3> User logged in: {loginContext.login}</h3>
      <br/>
      <Link to="/">Navigate to Page Login</Link>
    </div>
  );
};
