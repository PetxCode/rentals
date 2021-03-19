import React, { useState, useEffect } from "react";
import { app } from "../../base";

const home = app.firestore().collection("rent");
const homeUser = app.firestore().collection("user");

const DisplayWhoComented = ({ id, whoPostedThis }) => {
  const [thePost, setThePost] = useState([]);
  const [allComments, setAllComments] = useState([]);

  const onThePost = async () => {
    const newPost = await app.auth().currentUser;
    if (newPost) {
      await homeUser
        .doc(whoPostedThis)
        .get()
        .then((doc) => {
          setThePost(doc.data());
        });
    }
  };

  useEffect(() => {
    onThePost();
  }, []);
  return (
    <div>
      <div>
        <img
          src={thePost && thePost.avatar}
          alt="avatar"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "2px solid lightblue",
            objectFit: "cover",
            marginRight: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default DisplayWhoComented;
