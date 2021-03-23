import { Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { app } from "../../base";
import { AuthContext } from "../AuthUser";

const ButtonChnge = ({ createdBy, available, id, shown }) => {
  const { current } = useContext(AuthContext);
  const [myUID, setMyUID] = useState([]);
  const [show, setShow] = useState(false);

  const showMyUID = async (id) => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      setMyUID(newUser.uid);
    }
  };

  const onEditAvaliability = async () => {
    await app.firestore().collection("rent").doc(id).update({
      available: show,
    });
  };

  useEffect(() => {
    showMyUID();
  }, []);
  return (
    <div>
      <div>
        {available ? <div> Avaliable </div> : <div> Not-Avaliable </div>}
      </div>
      <div>
        {myUID === createdBy && (
          <div>
            {" "}
            <Button
              onClick={() => {
                setShow(!show);
                onEditAvaliability(id);
                console.log("change: " + available);
              }}
            >
              Change Na
            </Button>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonChnge;
