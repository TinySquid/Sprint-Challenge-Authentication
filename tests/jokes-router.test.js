const request = require("supertest");

const db = require("../database/dbConfig");

const server = require("../api/server");

//* JOKES ROUTER
describe("Jokes-Router", () => {
  //? Clear database before each test
  beforeEach(async () => {
    await db("users").truncate();
  });

  test("returns 200 status code for auth users", () => {
    const newUser = { username: "RedMoon15", password: "claDS*123" };
    const existingUser = { username: "RedMoon15", password: "claDS*123" };

    const expectedStatusCode = 200;

    return request(server)
      .post("/api/auth/register")
      .send(newUser)
      .then(() => {
        return request(server)
          .post("/api/auth/login")
          .send(existingUser)
          .expect(200)
          .then((res) => {
            const token = res.body.token;

            return request(server)
              .get("/api/jokes")
              .set("authorization", token)
              .expect(expectedStatusCode);
          });
      });
  });
  test("returns correct content-type", () => {
    const newUser = { username: "RedMoon15", password: "claDS*123" };
    const existingUser = { username: "RedMoon15", password: "claDS*123" };

    return request(server)
      .post("/api/auth/register")
      .send(newUser)
      .then(() => {
        return request(server)
          .post("/api/auth/login")
          .send(existingUser)
          .expect(200)
          .then((res) => {
            const token = res.body.token;

            return request(server)
              .get("/api/jokes")
              .set("authorization", token)
              .expect("Content-Type", /json/);
          });
      });
  });

  test("returns array of jokes", () => {
    const newUser = { username: "RedMoon15", password: "claDS*123" };
    const existingUser = { username: "RedMoon15", password: "claDS*123" };

    return request(server)
      .post("/api/auth/register")
      .send(newUser)
      .then(() => {
        return request(server)
          .post("/api/auth/login")
          .send(existingUser)
          .expect(200)
          .then((res) => {
            const token = res.body.token;

            return request(server)
              .get("/api/jokes")
              .set("authorization", token)
              .then((res) => {
                expect(Array.isArray(res.body)).toBe(true);
              });
          });
      });
  });
});
