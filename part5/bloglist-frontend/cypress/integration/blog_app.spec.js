describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Ron Apptest",
      username: "ronapptest",
      password: "mettaworldpeace",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("ronapptest");
      cy.get("#password").type("mettaworldpeace");
      cy.get("#login-button").click();

      cy.contains("Ron Apptest logged in");
    });
    it("fails with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("shouldfail");
      cy.get("#password").type("notreal");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "shouldfaill logged in");
    });
  });
  describe("When Logged in", function () {
    beforeEach(function () {
      cy.login({ username: "ronapptest", password: "mettaworldpeace" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("test blog1");
      cy.get("#author").type("John Doe");
      cy.get("#url").type("dev.to/testblog1");
      cy.contains("create").click();
      cy.contains("ronapptest added a new blog: test blog1");
      cy.contains("test blog1: by John Doe");
    });

    it("Another blog can be created", function () {
      cy.createBlog({
        title: "test blog1",
        author: "John",
        url: "dev.to/testblog1",
      });
      cy.createBlog({
        title: "test blog2",
        author: "Jane",
        url: "dev.to/testblog2",
      });
      cy.contains("test blog1: by John");
      cy.contains("test blog2: by Jane");
    });

    it("A user can like a blog", function () {
      cy.createBlog({
        title: "test blog1",
        author: "John",
        url: "dev.to/testblog1",
      });

      cy.contains("view").click();
      cy.contains("like").click().click();
      cy.contains("Likes: 2");
    });

    it("A user can delete a blog", function () {
      cy.createBlog({
        title: "test blog1",
        author: "John",
        url: "dev.to/testblog1",
      });

      cy.contains("view").click();
      cy.contains("delete").click();
      cy.should("not.contain", "test blog1");
    });

    it("A user cannot delete a blog that isn't theirs", function () {
      cy.createBlog({
        title: "test blog1",
        author: "John",
        url: "dev.to/testblog1",
      });
      cy.contains("logout").click();
      cy.visit("http://localhost:3000");

      cy.createUser({
        name: "fake user",
        username: "fakeuser",
        password: "fakepassword",
      });

      cy.login({ username: "fakeuser", password: "fakepassword" });
      cy.contains("view").click();
      cy.contains("delete").click();
      cy.contains("test blog1: by John");
    });

    it("blogs are ordered by likes", function () {
      cy.createBlog({
        title: "test blog1",
        author: "John",
        url: "dev.to/testblog1",
        likes: 5,
      });
      cy.createBlog({
        title: "test blog2",
        author: "Jane",
        url: "dev.to/testblog2",
      });
      cy.createBlog({
        title: "test blog3",
        author: "Jim",
        url: "dev.to/testblog3",
        likes: 4,
      });

      cy.get(".blog").then((blogs) => {
        cy.get(blogs).eq(0).contains("test blog1: by John");
        cy.get(blogs).eq(1).contains("test blog3: by Jim");
        cy.get(blogs).eq(2).contains("test blog2: by Jane");
      });
    });
  });
});
