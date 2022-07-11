const app = require("../app");
const request = require("supertest");
const data = require("../data");

describe("Nests API", () => {
  describe("GET /nests", () => {
    it("Gets the right number of nests", async () => {
      const { body } = await request(app).get("/nests").expect(200);
      expect(body.length).toEqual(data.nests.length);
    });

    it("Gets the right nests", async () => {
      const { body } = await request(app).get("/nests").expect(200);

      expect(body).toEqual(expect.arrayContaining(data.nests));
    });

    it("Should get a specific nest", async () => {
      const randomNestId =
        Math.floor(Math.random() * (data.nests.length - 1)) + 1;
      const randomNest = data.nests.find((nest) => nest.id === randomNestId);
      const { body } = await request(app)
        .get(`/nests/${randomNestId}`)
        .expect(200);
      expect(body).toEqual(expect.objectContaining(randomNest));
    });

    it("Should add a new nest to the nests array", async () => {
      const newNest = {
        location: "water",
      };
      const { body } = await request(app)
        .post("/nests")
        .send(newNest)
        .expect(200);
      expect(data.nests).toEqual(expect.arrayContaining([body]));
    });

    it("should return the new nest when adding one", async () => {
      const newNest = {
        location: "water",
      };
      const { body } = await request(app)
        .post("/nests")
        .send(newNest)
        .expect(200);
      expect(body).toEqual(
        expect.objectContaining({
          location: "water",
          id: expect.any(Number),
          size: "medium",
        })
      );
    });

    it("should return an error when you do not specify a name", async () => {
      const { body } = await request(app).post("/nests").send({}).expect(400);
      expect(body).toEqual(
        expect.objectContaining({
          message: "must supply location",
        })
      );
    });

    it("should delete the nest", async () => {
      const randomNestId =
        Math.floor(Math.random() * (data.nests.length - 1)) + 1;
      const randomNest = data.nests.find((nest) => nest.id === randomNestId);
      const { body } = await request(app)
        .delete(`/nests/${randomNestId}`)
        .expect(200);
      expect(body.deletedNest).toEqual(expect.objectContaining(randomNest));
      expect(body.nests).toEqual(expect.not.arrayContaining([randomNest]));
      expect(data.nests).toEqual(expect.not.arrayContaining([randomNest]));
    });
  });
});
