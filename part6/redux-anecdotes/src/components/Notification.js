import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 10,
  };

  const notification = useSelector((state) => state.message);

  return <div style={style}>{notification}</div>;
};

export default Notification;
