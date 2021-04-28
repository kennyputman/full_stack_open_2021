import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  Link,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from "@material-ui/core";
import { Link as routerLink } from "react-router-dom";
function User() {
  const id = useParams().id;
  const users = useSelector(({ users }) => users);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h5>Added Blogs</h5>
      <TableContainer>
        <Table>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link
                    component={routerLink}
                    to={`/blogs/${blog.id}`}
                    color="textPrimary"
                  >
                    {blog.title}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default User;
