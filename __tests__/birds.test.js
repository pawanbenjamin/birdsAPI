const app = require("../app");
const request = require("supertest");
const data = require("../data");

describe("Birds API", () => {
  describe("GET /birds", () => {
    it("Gets the right number of birds", async () => {
      const { body } = await request(app).get("/birds").expect(200);
      expect(body.length).toEqual(data.birds.length);
    });

    it("Gets the right birds", async () => {
      const { body } = await request(app).get("/birds").expect(200);

      expect(body).toEqual(expect.arrayContaining(data.birds));
    });

    it("Should get a specific bird", async () => {
      const randomBirdId =
        Math.floor(Math.random() * (data.birds.length - 1)) + 1;
      const randomBird = data.birds.find((bird) => bird.id === randomBirdId);
      const { body } = await request(app)
        .get(`/birds/${randomBirdId}`)
        .expect(200);
      expect(body).toEqual(expect.objectContaining(randomBird));
    });

    it("Should add a new bird to the birds array", async () => {
      const newBird = {
        name: "Hawk",
      };
      const { body } = await request(app)
        .post("/birds")
        .send(newBird)
        .expect(200);
      expect(data.birds).toEqual(expect.arrayContaining([body]));
    });

    it("should return the new bird when adding one", async () => {
      const newBird = {
        name: "Pelican",
      };
      const { body } = await request(app)
        .post("/birds")
        .send(newBird)
        .expect(200);
      expect(body).toEqual(
        expect.objectContaining({
          name: "Pelican",
          id: expect.any(Number),
          viewCount: 0,
        })
      );
    });

    it("should return an error when you do not specify a name", async () => {
      const { body } = await request(app).post("/birds").send({}).expect(400);
      expect(body).toEqual(
        expect.objectContaining({
          message: "must supply name",
        })
      );
    });

    it("should update a bird", async () => {
      const randomBirdId =
        Math.floor(Math.random() * (data.birds.length - 1)) + 1;
      const randomBird = data.birds.find((bird) => bird.id === randomBirdId);
      const { body } = await request(app)
        .patch(`/birds/${randomBirdId}`)
        .send({
          name: "Booby",
        })
        .expect(200);
      expect(randomBird.name).toEqual("Booby");
    });

    it("should delete the bird", async () => {
      const randomBirdId =
        Math.floor(Math.random() * (data.birds.length - 1)) + 1;
      const randomBird = data.birds.find((bird) => bird.id === randomBirdId);
      const { body } = await request(app)
        .delete(`/birds/${randomBirdId}`)
        .expect(200);
      expect(body.deletedBird).toEqual(randomBird);
      expect(body.birds).toEqual(expect.not.arrayContaining([randomBird]));
      expect(data.birds).toEqual(expect.not.arrayContaining([randomBird]));
    });
  });
});
