import React, { useState, useEffect } from "react";
import { app } from "../../base";

const home = app.firestore().collection("rent");
const homeUser = app.firestore().collection("user");

const SingleReply = ({ id, shown }) => {
  const [rep, setRep] = useState(true);

  const toShow = async () => {
    await app
      .firestore()
      .collection("rent")
      .doc()
      .collection("comment")
      .doc(id)
      .update({
        shown: rep,
      });
  };
  useEffect(() => {
    toShow();
  }, []);
  return (
    <div
      style={{
        fontWeight: "bold",
        fontSize: "10px",
        marginRight: "5px",
        cursor: "pointer",
        color: "red",
      }}
      onClick={() => {
        setRep(!rep);
        toShow(id);
        console.log(shown);
      }}
    >
      <div>Reply</div>

      {shown ? <div>Hello </div> : null}
    </div>
  );
};

export default SingleReply;
