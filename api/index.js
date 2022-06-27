const apiRouter = require("express").Router();

apiRouter.get("/health", (req, res) => {
  res.send({ message: "Server is running" });
});

const urlsRouter = require("./urls");
apiRouter.use("/", urlsRouter);

module.exports = apiRouter;
