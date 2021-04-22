import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function User() {
  const id = useParams().id;
  const users = useSelector(({ users }) => users);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
