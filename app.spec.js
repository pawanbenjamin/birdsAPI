const app = require("./app");
const request = require("supertest");

describe("App", () => {
  describe("GET /", () => {
    it("Renders the welcome message", async () => {
      const response = await request(app).get("/").expect(200);
      expect(response.text).toEqual(
        expect.stringContaining("Welcome to Bird-API!")
      );
    });
  });
});
