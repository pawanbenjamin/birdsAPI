const express = require("express");
const createError = require("http-errors");

const nestsRouter = express.Router();

const data = require("../data");

// GET /nests
nestsRouter.get("/", (req, res, next) => {
  res.send(data.nests);
});

// GET /nests/1
nestsRouter.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const nest = data.nests.find((nest) => nest.id === id);
  res.send(nest);
});

// POST /nests
nestsRouter.post("/", (req, res, next) => {
  const { location, size } = req.body;
  if (!location) {
    next(createError(400, "must supply location"));
  }
  const newNest = {
    location,
    size: size || "medium",
    id: data.nests[data.nests.length - 1].id + 1,
  };
  data.nests.push(newNest);
  res.send(newNest);
});

// DELETE /nests/1
nestsRouter.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const deletedNest = data.nests.find((nest) => nest.id === id);
  data.nests = data.nests.filter((nest) => nest.id !== id);
  res.send({
    deletedNest,
    nests: data.nests,
  });
});

module.exports = nestsRouter;
