/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");
const app = require("../app");

let token = "";

beforeAll(async () => {
  const response = await request(app).post("/api/login").send({
    username: "cookie",
    password: "1",
  });
  token = response.body.token;
});

describe("Test the restaurant", () => {
  let testRestId;
  let createTestRestId;

  beforeEach(async () => {
    // 測試用例開始前，先創建一個餐廳，並取得其生成的 ID
    const response = await request(app)
      .post("/api/restaurants")
      .send({
        name: "測試餐廳",
        phone: "09090909093",
        address: "台灣Taiwan3",
      })
      .set("Authorization", `Bearer ${token}`);
    testRestId = response.body.id;
  });

  afterEach(async () => {
    // 測試用例結束後，清理資料庫，刪除先前創建的餐廳
    await request(app)
      .delete(`/api/restaurants/${testRestId}`)
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .delete(`/api/restaurants/${createTestRestId}`)
      .set("Authorization", `Bearer ${token}`);
  });

  test("Get all restaurant", (done) => {
    request(app)
      .get("/api/restaurants")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("post restaurant", (done) => {
    request(app)
      .post("/api/restaurants")
      .send({
        name: "325TestRest",
        phone: "09090909093",
        address: "台灣Taiwan3",
      })
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        createTestRestId = response.body.id;
        expect(response.body).toHaveProperty("name", "325TestRest");
        done();
      });
  });

  test("get the restaurant", (done) => {
    request(app)
      .get(`/api/restaurants/${testRestId}`)
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("name", "測試餐廳");
        done();
      });
  });
});
