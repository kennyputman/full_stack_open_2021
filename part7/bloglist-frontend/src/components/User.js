import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function User() {
  const id = useParams().id;
  const users = useSelector(({ users }) => users);

  const user = users.find((u) => u.id === id);
  console.log(user.blogs);
  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
}

export default User;
