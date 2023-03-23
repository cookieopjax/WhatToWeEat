/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");
const app = require("../app");

beforeAll(async () => {
  const response = await request(app).post("/api/login").send({
    username: "cookie",
    password: "1",
  });
  token = response.body.token;
});

describe("Test the restaurant", () => {
  test("Get all restaurant", (done) => {
    request(app)
      .get("/api/restaurants")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
