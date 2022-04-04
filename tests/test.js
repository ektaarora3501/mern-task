const request = require("supertest");
const app = require("../index");

describe("GET /users/test/", () => {
  it("respond with Hello World", (done) => {
    request(app).get("/users/test/").expect("hello world", done);
  })
});