import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import { app } from "../../base";

const home = app.firestore().collection("rent");
const homeUser = app.firestore().collection("user");

const PostComment = ({ id, createdBy, createdAt }) => {
  const [postComment, setPostComment] = useState([]);
  const [whoCreated, setWhoCreated] = useState([]);

  const viewCreatedBy = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await homeUser
        .doc(id)
        .collection("comment")
        .doc()
        .get()
        .then((doc) => {
          setWhoCreated(doc.data());
        });
    }
  };

  const onPostComment = async () => {
    const newComment = await app.auth().currentUser;

    if (newComment) {
      await home.doc(id).collection("comment").doc().set({
        whoPostedThis: newComment.uid,
        shown: false,
        postComment,
        timePosted: new Date().toString(),
        timeArranged: new Date().toLocaleString(),
      });
      setPostComment("");
    }
    setPostComment("");
  };

  const [viewComment, setViewComment] = useState([]);

  const viewCommentCount = async () => {
    const comment = await app.auth().currentUser;

    if (comment) {
      await home
        .doc(id)
        .collection("comment")

        .onSnapshot((snapshot) => {
          const item = [];
          snapshot.forEach((doc) => {
            item.push({ ...doc.data(), id: doc.id });
          });
          setViewComment(item);
        });
    }
  };

  useEffect(() => {
    viewCommentCount();
  }, []);
  return (
    <div>
      {" "}
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Input
          placeholder="comment"
          value={postComment}
          onChange={(e) => {
            setPostComment(e.target.value);
          }}
        />
        <Button
          style={{
            marginTop: "5px",
          }}
          onClick={onPostComment}
        >
          comment
        </Button>{" "}
        <br />
      </div>
    </div>
  );
};

export default PostComment;
