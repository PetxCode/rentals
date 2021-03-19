import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { app } from "../../base";
import HeaderView from "../HeaderView";

const authUser = app.firestore().collection("user");
const Registeration = () => {
  const hist = useHistory();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [pix, setPix] = useState(null);

  const onAvatar = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPix(await fileRef.getDownloadURL());
  };

  const onOpen = () => {
    setOpen(!open);
  };

  const onSignIn = async () => {
    await app.auth().signInWithEmailAndPassword(email, password);
    hist.push("/");
  };

  const onSignUp = async () => {
    const newUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await authUser.doc(newUser.user.uid).set({
      email,
      password,
      name,
      avatar: await pix,
    });
    hist.push("/");
  };

  return (
    <div>
      <HeaderView />
      <br />

      <br />
      {open ? (
        <center
          style={{
            width: "500px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "50px",
          }}
        >
          <Input
            type="file"
            // placeholder="Name"
            // value={name}
            onChange={onAvatar}
          />

          <br />
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <br />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />

          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            type="primary"
            danger
            style={{
              width: "100%",
            }}
            onClick={onSignUp}
          >
            Sign Up
          </Button>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>Already have an, </div>
            <div
              style={{
                marginLeft: "5px",
                color: "red",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={onOpen}
            >
              Sign in here
            </div>
          </div>
        </center>
      ) : (
        <center
          style={{
            width: "500px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "50px",
          }}
        >
          <br />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />

          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            type="primary"
            style={{
              width: "100%",
            }}
            onClick={onSignIn}
          >
            Sign In
          </Button>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>Already have an, </div>
            <div
              style={{
                marginLeft: "5px",
                color: "blue",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={onOpen}
            >
              Sign up here
            </div>
          </div>
        </center>
      )}
    </div>
  );
};

export default Registeration;
