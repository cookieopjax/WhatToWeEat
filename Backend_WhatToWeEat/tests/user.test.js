/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("App status", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the User Authentication", () => {
  test("Login", (done) => {
    request(app)
      .post("/api/login")
      .send({
        username: "cookie",
        password: "1",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
        done();
      });
  });
});
