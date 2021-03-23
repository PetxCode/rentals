import React, { useState, useEffect } from "react";
import { app } from "../../base";

const home = app.firestore().collection("rent");
const homeUser = app.firestore().collection("user");

const DisplayCommentName = ({ id, whoPostedThis }) => {
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
      <div>{thePost && thePost.name}</div>
      <div></div>
    </div>
  );
};

export default DisplayCommentName;
