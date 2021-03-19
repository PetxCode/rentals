import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { app } from "../../base";
import { AuthContext } from "../AuthUser";
import AllPostComment from "./AllPostComment";
import PostComment from "./PostComment";
import WhoPosted from "./WhoPosted";

const home = app.firestore().collection("rent");
const ViewHome = () => {
  const { current } = useContext(AuthContext);
  const [homes, setHomes] = useState([]);
  const [comments, setComments] = useState([]);

  const ViewAllComment = async () => {
    await home
      .doc()
      .collection("comment")
      .onSnapshot((snapshot) => {
        const i = [];
        snapshot.forEach((doc) => {
          i.push(doc.data());
        });
        setComments(i);
      });
  };

  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(!open);
  };

  const getHomes = async () => {
    await home.orderBy("timeDate", "desc").onSnapshot((snapshot) => {
      const item = [];
      snapshot.forEach((doc) => {
        item.push({ ...doc.data(), id: doc.id });
      });
      setHomes(item);
      // console.log(homes);
    });
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
                  <div> 0</div>
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
                    <div>
                      {" "}
                      {available ? (
                        <div> Available </div>
                      ) : (
                        <div> Not Available </div>
                      )}{" "}
                    </div>
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
                onClick={(id) => {
                  setOpen(!open);
                }}
              >
                View All Comments id
              </div>

              {open ? <AllPostComment id={id} createdBy={createdBy} /> : null}
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
