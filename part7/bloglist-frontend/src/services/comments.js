import axios from "axios";

const getAll = () => {
  const request = axios.get("/api/comments");
  return request.then((response) => response.data);
};

const create = async (comment) => {
  const url = `/api/blogs/${comment.blog}/comments`;
  const response = await axios.post(url, comment);
  return response.data;
};
export default { getAll, create };
