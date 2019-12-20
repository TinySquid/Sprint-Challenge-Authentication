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
        .expect(201)
        .expect("Content-Type", /json/);
    });

    test("returns userId matching new user created", () => {
      const newUser = { username: "RedMoon15", password: "claDS*123" };
      const expectedUserId = 1;

      return request(server)
        .post("/api/auth/register")
        .send(newUser)
        .expect(201)
        .then((res) => {
          expect(res.body.userId).toEqual(expectedUserId);
        });
    });
  });

  //* /login route
  describe("POST /login", () => {
    test("returns 200 status code", () => {
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
            .expect(expectedStatusCode);
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
            .expect("Content-Type", /json/);
        });
    });

    test("returns a JWT", () => {
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
              expect(res.body.token).toBeDefined();
            });
        });
    });
  });
});
