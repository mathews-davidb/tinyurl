const express = require("express");

const { assignURL, getLinkedURLByTinyURL } = require("../db/url");

const urlsRouter = require("express").Router();

//========================================================

urlsRouter.post("/links", async (req, res, next) => {
  const { linkedURL } = req.body;
  try {
    if (linkedURL === undefined) {
      res.status(400);
      res.send({ error: "missing_url" });
    } else {
      res.status(200);
      const url = await assignURL(linkedURL);
      res.send({ link: `http://localhost:3000/${url.tiny_url}` });
    }
  } catch (error) {
    throw error;
  }
});

//========================================================

urlsRouter.get("/:tinyURL", async (req, res, next) => {
  const tinyURL = req.params.tinyURL;
  const linkedURL = await getLinkedURLByTinyURL(tinyURL);
  if (linkedURL) {
    res.redirect(302, `http://${linkedURL}`);
  } else {
    res.status(404);
    res.send({ error: "not_found" });
  }
});

//========================================================

module.exports = urlsRouter;
