const express = require("express");
const server = express();
const apiRouter = require("./api");

server.use(express.json());

server.use("/", apiRouter);

server.listen(3000);
