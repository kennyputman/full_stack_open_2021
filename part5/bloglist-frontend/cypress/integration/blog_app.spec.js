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
    });
  });
});
