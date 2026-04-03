const express = require("express");
const userRouter = require("./user.router");
const issueRouter = require("./issue.router");
const repoRouter = require("./repo.router");

const mainRouter = express.Router();

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);


mainRouter.get("/", (req, res) => {
  res.send("Welcome!");
});

module.exports = mainRouter;

