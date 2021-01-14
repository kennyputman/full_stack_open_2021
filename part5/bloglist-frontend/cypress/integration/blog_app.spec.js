describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    // const user = {
    //   name: "Ron apptest",
    //   username: "ronapptest",
    //   password: "mettaworldpeace",
    // };
    // cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
  });
});
