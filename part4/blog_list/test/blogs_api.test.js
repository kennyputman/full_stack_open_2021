const { after } = require("lodash");
const mongoose = require("mongoose");
const helper = require("./test_helper.js");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

// ******* Tests for Blog Posts ******** //

describe("api/blog tests", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog);
      await blogObject.save();
    }
  });

  describe("when initially some notes are saved", () => {
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
  });

  describe("when a new blog post is created", () => {
    test("POST request creates a new blog post'", async () => {
      await api
        .post("/api/blogs")
        .send(helper.newBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsAfterPost = await helper.blogsInDb();
      //check to see if a blog is added
      expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1);

      //checks to see if blog is added and correct
      const contents = blogsAfterPost.map((n) => n.author);
      expect(contents).toContain("Edward Leamer");
    });

    test("missing likes property from request defaults to 0", async () => {
      await api
        .post("/api/blogs")
        .send(helper.newBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsAfterPost = await helper.blogsInDb();
      //check to see if a blog is added

      //checks to see if blog is added and correct
      const contents = blogsAfterPost.map((n) => n.likes);
      expect(contents).toContain(0);
    });

    test("blog with missing data responds with status code 400 bad request", async () => {
      await api.post("/api/blogs").send(helper.badBlog).expect(400);
    });
  });

  describe("When a blog post is deleted", () => {
    test("deleting a blog posts reduces blogs by one'", async () => {
      await api.delete("/api/blogs/5a422a851b54a676234d17f7").expect(204);

      const blogsAfterDelete = await helper.blogsInDb();
      expect(blogsAfterDelete.length).toBe(helper.initialBlogs.length - 1);
    });
    test("deleting a blog posts removes correct blog post'", async () => {
      await api.delete("/api/blogs/5a422a851b54a676234d17f7").expect(204);

      const blogsAfterDelete = await helper.blogsInDb();

      const contents = blogsAfterDelete.map((n) => n.author);
      expect(contents).not.toContain("Michael Chan");
    });
  });

  describe("When a blog post is updated", () => {
    test("updating blog post maintains number of blogs'", async () => {
      await api
        .put("/api/blogs/5a422b891b54a676234d17fa")
        .send(helper.blogWithMoreLikes)
        .expect(200);

      const blogsAfterUdpate = await helper.blogsInDb();

      expect(blogsAfterUdpate.length).toBe(helper.initialBlogs.length);
    });
    test("updating blog post updates correct information", async () => {
      await api
        .put("/api/blogs/5a422b891b54a676234d17fa")
        .send(helper.blogWithMoreLikes)
        .expect(200);

      const blogsAfterUdpate = await helper.blogsInDb();
      const contents = blogsAfterUdpate.map((n) => n);

      expect(blogsAfterUdpate).toEqual(
        expect.arrayContaining([
          expect.objectContaining(helper.blogWithMoreLikes),
        ])
      );
    });
  });
});

// ********* Tests for Users *********** //

describe("api/user test", () => {
  describe("when there is initially one user in db", () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("sekret", 10);
      const user = new User({
        username: "root",
        name: "Superuser",
        passwordHash,
      });

      await user.save();
    });

    test("creation succeeds with a fresh username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "mluukkai",
        name: "Matti Luukkainen",
        password: "salainen",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("`username` to be unique");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test("creation fails with proper statuscode and message if username is less than 3 characters", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "ro",
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain(
        "username must be 3 characters or more"
      );

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test("creation fails with proper statuscode and message if username is missing", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("`username` is required");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test("creation fails with proper statuscode and message if password is < 3 characters", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "s",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain(
        "password must be at least 3 characters long"
      );

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test("creation fails with proper statuscode and message if password is missing", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("password is required");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
