import { Button, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import { app } from "../../base";
import HeaderView from "../HeaderView";

const home = app.firestore().collection("rent");
const PostHome = () => {
  const hist = useHistory();

  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState("");
  const [address, setAddress] = useState("");

  const [available, setAvailable] = useState(true);

  const [coverImage, setCoverImage] = useState("");

  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  const [video, setVideo] = useState("");
  const [video1, setVideo1] = useState("");
  const [video2, setVideo2] = useState("");
  const [video3, setVideo3] = useState("");

  const onCoverImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setCoverImage(await fileRef.getDownloadURL());
  };

  const onImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImage(await fileRef.getDownloadURL());
  };

  const onImage1 = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImage1(await fileRef.getDownloadURL());
  };

  const onImage2 = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImage2(await fileRef.getDownloadURL());
  };

  const onImage3 = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImage3(await fileRef.getDownloadURL());
  };

  const onVideo = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setVideo(await fileRef.getDownloadURL());
  };

  const onVideo1 = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setVideo1(await fileRef.getDownloadURL());
  };

  const onVideo2 = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setVideo2(await fileRef.getDownloadURL());
  };

  const onVideo3 = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setVideo3(await fileRef.getDownloadURL());
  };

  const onPostHome = async () => {
    const newPost = await app.auth().currentUser;

    if (newPost) {
      await home.doc().set({
        location,
        cost,
        desc,
        address,
        available,
        // setAvailable,
        coverImage,
        image,
        image1,
        image2,
        image3,
        video,
        video1,
        video2,
        video3,
        createdBy: newPost.uid,
        createdAt: new Date().toLocaleString(),
        timeDate: new Date().toString(),
      });
    }
    hist.push("/");
    window.location.reload(true);
  };

  return (
    <div>
      <HeaderView />
      <br />
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <center
          style={{
            display: "flex",
            flexDirection: "column",
            width: "500px",
            // justifyContent: "flex-end",
            // alignItems: "flex-start",
            marginLeft: "20px",
          }}
        >
          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Cover Image
            </label>
            <Input type="file" onChange={onCoverImage} />
          </div>
          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              First Image
            </label>
            <Input type="file" onChange={onImage} />
          </div>
          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Second Image
            </label>
            <Input type="file" onChange={onImage1} />
          </div>
          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Third Image
            </label>
            <Input type="file" onChange={onImage2} />
          </div>
          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Fourth Image
            </label>
            <Input type="file" onChange={onImage3} />
          </div>

          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              First Video
            </label>
            <Input type="file" onChange={onVideo} />
          </div>

          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Second Video
            </label>
            <Input type="file" onChange={onVideo1} />
          </div>

          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Third Video
            </label>
            <Input type="file" onChange={onVideo2} />
          </div>

          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Fourth Video
            </label>
            <Input type="file" onChange={onVideo3} />
          </div>

          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Location
            </label>
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>

          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Address
            </label>
            <Input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>

          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Description
            </label>
            <Input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>

          <br />

          <div>
            <label
              style={{
                display: "flex",
                fontSize: "16px",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              Cost
            </label>
            <Input
              type="text"
              placeholder="Cost"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </div>

          <br />

          <div>
            <Button
              type="primary"
              danger
              style={{
                width: "100%",
              }}
              onClick={onPostHome}
            >
              Submit
            </Button>
          </div>
        </center>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default PostHome;
