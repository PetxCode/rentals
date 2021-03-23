import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { app } from "../base";
import { AuthContext } from "./AuthUser";

const HeaderView = () => {
  const { current } = useContext(AuthContext);
  return (
    <div>
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            fontWeightL: "bold",
            fontSize: "16px",
            textTransform: "uppercase",
          }}
        >
          Home
        </Link>
        <Link
          to="/image"
          style={{
            color: "white",
            fontWeightL: "bold",
            fontSize: "16px",
            textTransform: "uppercase",
          }}
        >
          Image Preview
        </Link>
        <Link
          to="/"
          style={{
            color: "white",
            fontWeightL: "bold",
            fontSize: "16px",
            textTransform: "uppercase",
          }}
        >
          Home
        </Link>
        {current ? (
          <Button
            type="primary"
            danger
            style={{
              display: "flex",
              alignItems: "center",
              fontWeightL: "bold",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
            onClick={() => {
              app.auth().signOut();
              window.location.reload(true);
            }}
          >
            <Link to="/reg">Sign Out</Link>
          </Button>
        ) : (
          <Button
            type="primary"
            danger
            style={{
              display: "flex",
              alignItems: "center",
              fontWeightL: "bold",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            <Link to="/reg">Sign Up</Link>
          </Button>
        )}
      </Header>
    </div>
  );
};

export default HeaderView;
