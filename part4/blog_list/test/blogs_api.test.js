const { after } = require("lodash");
const mongoose = require("mongoose");
const helper = require("./test_helper.js");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("Test DB Cleared");

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct number of blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
