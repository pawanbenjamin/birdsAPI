const express = require("express");
const morgan = require("morgan");

const app = express();
const birdsRouter = require("./routes/birds");
const nestsRouter = require("./routes/nests");

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Bird-API!</h1>");
});

app.use("/birds", birdsRouter);
app.use("/nests", nestsRouter);

app.use((err, req, res, next) => {
  // if we are in production, remove the stack from the error JSON
  //   if (process.env["NODE_ENV"] !== "production") {
  //     delete err.stack;
  //   }

  // If the error has a state, use that as the HTTP status code
  if (err.status) {
    res.status(err.status);
  }

  res.send(err);
});

module.exports = app;
