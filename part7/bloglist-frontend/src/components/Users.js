import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Users() {
  const users = useSelector(({ users }) => users);

  const usersList = users.map((user) => (
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  ));

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>{usersList}</tbody>
      </table>
    </div>
  );
}

export default Users;
