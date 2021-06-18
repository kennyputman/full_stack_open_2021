import express from "express";

const app = express();

const PORT = 3003;

app.get("/hello", (_req, res) => {
  res.send("Hello full stack!");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
