const request = require("supertest");

const db = require("../database/dbConfig");

const server = require("../api/server");

//* AUTH ROUTER
describe("Auth-Router", () => {
  //? Clear database before each test
  beforeEach(async () => {
    await db("users").truncate();
  });

  //* /register route
  describe("POST /register", () => {
    test("returns 201 status code", () => {
      const newUser = { username: "RedMoon15", password: "claDS*123" };
      const expectedStatusCode = 201;

      return request(server)
        .post("/api/auth/register")
        .send(newUser)
        .expect(expectedStatusCode);
    });

    test("returns correct content-type", () => {
      const newUser = { username: "RedMoon15", password: "claDS*123" };

      return request(server)
        .post("/api/auth/register")
        .send(newUser)
        .expect("Content-Type", /json/);
    });

    test("returns userId matching new user created", () => {
      const newUser = { username: "RedMoon15", password: "claDS*123" };
      const expectedUserId = 1;

      return request(server)
        .post("/api/auth/register")
        .send(newUser)
        .then((res) => {
          expect(res.body.userId).toEqual(expectedUserId);
        });
    });
  });

  //* /login route
  describe("POST /login", () => {
    test("returns 200 status code", () => {
      //TODO Add test
    });

    test("returns correct content-type", () => {
      //TODO Add test
    });

    test("returns a JWT", () => {
      //TODO Add test
    });
  });
});
