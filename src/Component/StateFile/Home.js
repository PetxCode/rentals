import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthUser";
import HeaderView from "../HeaderView";
import ViewHome from "./ViewHome";

const Home = () => {
  const { current } = useContext(AuthContext);
  return (
    <div>
      <HeaderView />
      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "lightblue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "25px",
          textTransform: "uppercase",
          color: "red",
          fontFamily: "Poppins",
          marginBottom: "30px",
          flexDirection: "column",
        }}
      >
        <div> {current && current.email}</div>
        <div>
          {" "}
          <Link to="/post">Post a Home</Link>{" "}
        </div>
      </div>
      <div>
        <ViewHome />
      </div>
      <div> </div>
    </div>
  );
};

export default Home;
