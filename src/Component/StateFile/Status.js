import moment from "moment";
import React, { useState, useEffect } from "react";
import { app } from "../../base";
import DisplayCommentName from "./DisplayCommentName";
import DisplayWhoComented from "./DisplayWhoComented";

const home = app.firestore().collection("rent");
const homeUser = app.firestore().collection("user");

const OnlyFewCommit = ({ id, createdBy }) => {
  const [posts, setPosts] = useState([]);
  const [whoComment, setWhoComment] = useState([]);

  const onWhoCommented = async () => {
    const newUser = await app.auth().currentUser;
    if (newUser) {
      await homeUser

        .doc(createdBy)
        .get()
        .then((doc) => {
          setWhoComment(doc.data());
        });
    }
  };

  const onPostComment = async () => {
    const newUser = await app.auth().currentUser;
    if (newUser) {
      await home

        .doc(id)
        .collection("comment")
        .orderBy("timeArranged", "desc")
        .limit(1)
        .onSnapshot((snapshot) => {
          const item = [];
          snapshot.forEach((doc) => {
            item.push({ ...doc.data(), id: doc.id });
          });
          setPosts(item);
        });
    }
  };

  useEffect(() => {
    onPostComment();
    onWhoCommented();
  }, []);
  return (
    <div>
      <div>
        {posts.map(({ id, postComment, whoPostedThis, timePosted, shown }) => (
          <div
            key={id}
            style={{
              margin: "10px",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "50px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <DisplayWhoComented whoPostedThis={whoPostedThis} id={id} />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  lineHeight: "1.2",
                }}
              >
                {" "}
                {postComment}{" "}
              </div>{" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyCenter: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  <DisplayCommentName whoPostedThis={whoPostedThis} id={id} />
                </div>

                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginRight: "5px",
                  }}
                >
                  {" "}
                  commented:{" "}
                </div>

                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {moment(timePosted).fromNow()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlyFewCommit;
