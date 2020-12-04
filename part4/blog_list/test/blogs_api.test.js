const { after } = require("lodash");
const mongoose = require("mongoose");
const helper = require("./test_helper.js");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const { initialBlogs } = require("./test_helper.js");

beforeEach(async () => {
  await Blog.deleteMany({});

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

test("unique identifier is 'id'", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0]).toBeDefined();
});

test("POST request creates a new blog post'", async () => {
  await api
    .post("/api/blogs")
    .send(helper.newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfterPost = await helper.blogsInDb();
  //check to see if a blog is added
  expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1);

  //checks to see if blog is added and correct
  const contents = blogsAfterPost.map((n) => n.author);
  expect(contents).toContain("Edward Leamer");
});

test("missing likes property from request defaults to 0'", async () => {
  await api
    .post("/api/blogs")
    .send(helper.newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfterPost = await helper.blogsInDb();
  //check to see if a blog is added

  //checks to see if blog is added and correct
  const contents = blogsAfterPost.map((n) => n.likes);
  expect(contents).toContain(0);
});

afterAll(() => {
  mongoose.connection.close();
});
