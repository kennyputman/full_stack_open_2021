const { after } = require("lodash");
const mongoose = require("mongoose");
const helper = require("./test_helper.js");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

// beforeEach(async() => {
//   await Blog.deleteMany({})
//   console.log('Test DB Cleared')

//   let blogObject = new Blog(initialBlogs[0])
//   await
// })

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
