import axios from "axios";

const getAll = () => {
  const request = axios.get("/api/comments");
  return request.then((response) => response.data);
};

const create = async (comment) => {
  console.log("adding comment with content: ", comment);
  //   const response = await axios.post(baseUrl, newObject, config);
  return null;
};

export default { getAll, create };
