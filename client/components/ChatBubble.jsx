import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ChatBubble(props) {
  const { username, message, id } = props;
  const [bgColor, setBgColor] = useState("#D880B6"); //
  const [userColor, setUserColor] = useState("#000000"); //
  const [messagePosition, setMessagePosition] = useState('left'); //


  //Giles Steiner
  //
  //Make the user messages a different color than other messages
  useEffect(() => {
    if (id === username) {
      setBgColor("#80ABD8");
      setUserColor("#80ABD8");
      // setMessagePosition("right");
    }
  }, [username]);

  //PJ did some animation magic here
  return (
    <motion.div
      animate={{ x: 35, scale: 1 }}
      initial={{ scale: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      {/* <div
        className="bubble"
      > */}
        <div
          className="user" style={{color : userColor}}
        >
          {id === username ? username + ' (me)' : username}<br></br>
        </div>
        <div
          className="theMessage"
        >
          {message}
        </div>
      {/* </div> */}
    </motion.div>
  );
}
