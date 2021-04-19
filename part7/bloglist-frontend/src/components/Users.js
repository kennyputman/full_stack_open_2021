import React from "react";

function Users({ users }) {
  console.log("users in Users: ", users);
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
        <tbody>
          {users.map((user) => {
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
