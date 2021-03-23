import React, { useState, useEffect } from "react";
import { app } from "../../base";
import moment from "moment";

const home = app.firestore().collection("user");

const WhoPosted = ({ createdBy, createdAt }) => {
  const [who, setWho] = useState([]);

  const getWhoPosted = async () => {
    const newPosted = await app.auth().currentUser;

    if (newPosted) {
      await home
        .doc(createdBy)
        .get()
        .then((doc) => {
          setWho(doc.data());
          console.log(who);
        });
    }
  };

  useEffect(() => {
    getWhoPosted();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        marginLeft: "10px",
        marginTop: "10px",
        marginBottom: "10px"
      }}
    >
      <div>
        {" "}
        <img
          src={who && who.avatar}
          alt="image"
          style={{
            zIndex: "1",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid white",
          }}
        />
      </div>
      <div
        style={{
          marginLeft: "10px",
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>{who && who.name}</div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {moment(createdAt).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default WhoPosted;

// <img
// src={who && who.avatar}
// alt="image"
// style={{
//   zIndex: "1",
//   width: "50px",
//   height: "50px",
//   borderRadius: "50%",
//   objectFit: "cover",
//   border: "4px solid white",
// }}
// />
