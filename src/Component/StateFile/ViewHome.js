import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { app } from "../../base";
import { AuthContext } from "../AuthUser";
import AllPostComment from "./AllPostComment";
import CommentCount from "./CommentCount";
import PostComment from "./PostComment";
import WhoPosted from "./WhoPosted";
import OnlyFewCommit from "./Status";
import { Button } from "antd";
import ButtonChnge from "./ButtonChnge";

const home = app.firestore().collection("rent");

const ViewHome = () => {
  const { current } = useContext(AuthContext);
  const [homes, setHomes] = useState([]);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const onOpen = () => {
    setOpen(!open);
  };

  const getHomes = async () => {
    await home.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      const item = [];
      snapshot.forEach((doc) => {
        item.push({ ...doc.data(), id: doc.id });
      });
      setHomes(item);
      // console.log(homes);
    });
  };

  const onEditChnage = async (id) => {
    await home.doc(id).update({
      available: open,
    });
    console.log(id);
  };

  const onEditChnageCommit = async (id) => {
    await home.doc(id).update({
      shown: open1,
    });
    console.log(id);
  };

  useEffect(() => {
    getHomes();
  }, []);
  return (
    <div>
      <center>Home Posted</center>
      <br />
      <br />
      <br />
      <center
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {homes.map(
          ({
            available,
            desc,
            id,
            location,
            address,
            coverImage,
            cost,
            createdBy,
            createdAt,
            shown,
          }) => (
            <div
              key={id}
              style={{
                width: "320px",
                backgroundColor: "lightblue",
                margin: "10px",
                borderRadius: "5px",
                display: "felx",
                flexDirection: "column",
                // justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div>
                <WhoPosted createdBy={createdBy} createdAt={createdAt} />
              </div>
              <div>
                <Link to={`/detail/${id}`}>
                  <img
                    src={coverImage}
                    alt="coverImage"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "5px 5px 0 0",
                    }}
                  />
                </Link>
              </div>
              <div
                style={{
                  textAlign: "left",
                  padding: "13px",
                }}
              >
                {desc}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Location
                  </label>
                  <div> {location}</div>
                </div>
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    comment
                  </label>
                  <div>
                    {" "}
                    <CommentCount id={id} />{" "}
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Cost
                  </label>
                  <div>{cost} </div>
                </div>
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </label>
                  <div>
                    {" "}
                    <ButtonChnge
                      available={available}
                      createdBy={createdBy}
                      id={id}
                      shown={shown}
                    />
                  </div>
                </div>
              </div>
              <PostComment
                id={id}
                createdBy={createdBy}
                createdAt={createdAt}
              />
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpen1(!open1);
                  onEditChnageCommit(id);
                  console.log("local " + open1);
                  console.log("firebase " + shown);
                }}
              >
                View All Comments
              </div>{" "}
              {shown ? (
                <div>
                  {" "}
                  <AllPostComment id={id} createdBy={createdBy} />{" "}
                </div>
              ) : (
                <div>
                  {" "}
                  <OnlyFewCommit id={id} createdBy={createdBy} />
                </div>
              )}{" "}
              <br />
            </div>
          )
        )}
      </center>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default ViewHome;

// <div>
//                   <AllPostComment id={id} createdBy={createdBy} />{" "}
//                 </div>

// {open1 ? <AllPostComment id={id} createdBy={createdBy} /> : null}

// <Button
//                       onClick={() => {
//                         setOpen(!open);

//                         onEditChnage(id);

//                         // console.log(id);
//                         console.log("local " + open);
//                         console.log("firebase " + available);
//                       }}
//                     >
//                       Chng
//                     </Button>
