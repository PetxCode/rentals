import React, { useEffect, useState } from "react";
import { app } from "../../base";

const home = app.firestore().collection("rent");
const CommentCount = ({ id }) => {
  const [comments, setComments] = useState([]);

  const ViewAllComment = async () => {
    await home
      .doc(id)
      .collection("comment")
      .onSnapshot((snapshot) => {
        const i = [];
        snapshot.forEach((doc) => {
          i.push(doc.data());
        });
        setComments(i);
        console.log(comments.length);
      });
  };

  useEffect(() => {
    ViewAllComment();
  }, []);
  return (
    <div>
      <div>{comments && comments.length}</div>
    </div>
  );
};

export default CommentCount;
