import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import { app } from "../../base";

const imageUp = app.firestore().collection("image");

const ImagePreview = () => {
  const [img, setImg] = useState(null);
  const [imgUpload, setImgUpload] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  const onImage = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onUploaded = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImgUpload(await fileRef.getDownloadURL());
    // console.log(file);
  };

  const onVideo3 = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImgUpload(await fileRef.getDownloadURL());
  };

  const onSubmit = async () => {
    await imageUp.doc().set({
      avatar: await imgUpload,
      createdAt: new Date().toLocaleString(),
    });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <center>Image Upload</center>
      <br />
      <br />
      <br />
      <center>
        <br />
        <div
          style={{
            backgroundColor: "lightblue",
            width: "200px",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <Input type="file" style={{ display: "flex" }} onChange={onImage} />
          <label>Choose your Avatar</label>

          {img ? (
            <img
              src={img}
              alt="img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : null}
        </div>{" "}
        {img ? (
          <Button
            onClick={() => {
              setImg(null);
            }}
          >
            Change Choice
          </Button>
        ) : null}
        <br />
        <br />
        <Button
          onClick={() => {
            onSubmit();
          }}
        >
          Submit
        </Button>
      </center>
    </div>
  );
};

export default ImagePreview;
