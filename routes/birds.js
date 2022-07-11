const express = require("express");
const createError = require("http-errors");

const birdsRouter = express.Router();

const data = require("../data");

// GET /birds
birdsRouter.get("/", (req, res, next) => {
  res.send(data.birds);
});

// GET /birds/1
birdsRouter.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const bird = data.birds.find((bird) => bird.id === id);
  res.send(bird);
});

// POST /birds
birdsRouter.post("/", (req, res, next) => {
  const { name: birdName } = req.body;
  if (!birdName) {
    next(createError(400, "must supply name"));
    return;
  }
  const newBird = {
    name: birdName,
    id: data.birds[data.birds.length - 1].id + 1,
    viewCount: 0,
  };
  data.birds.push(newBird);
  res.send(newBird);
});

// PATCH /birds/1
birdsRouter.patch("/:id", (req, res, next) => {
  const { name: birdName } = req.body;
  const id = Number(req.params.id);
  const bird = data.birds.find((bird) => bird.id === id);
  bird.name = birdName;
  res.send(bird);
});

// DELETE /birds/1
birdsRouter.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const deletedBird = data.birds.find((bird) => bird.id === id);
  data.birds = data.birds.filter((bird) => bird.id !== id);
  res.send({
    deletedBird,
    birds: data.birds,
  });
});

module.exports = birdsRouter;
