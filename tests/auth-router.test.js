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
      //TODO Add test
    });

    test("returns correct content-type", () => {
      //TODO Add test
    });

    test("returns userId matching new user created", () => {
      //TODO Add test
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
