import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { app } from "../../base";

const home = app.firestore().collection("rent");
const homeUser = app.firestore().collection("user");

const DetailPage = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState();

  const viewDetail = async () => {
    const docRef = await home.doc(id);
    const docData = await docRef.get();
    setDetail(docData.data());
  };

  useEffect(() => {
    viewDetail();
  }, []);
  return (
    <div>
      <center>This is the Detail Page</center>
      <center>{id}</center>

      <center>{detail && detail.location}</center>
    </div>
  );
};

export default DetailPage;
