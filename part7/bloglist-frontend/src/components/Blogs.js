import {
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <div id="blogs">
      <Typography align="center" variant="h6" component="h2" gutterBottom>
        Blogs
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
