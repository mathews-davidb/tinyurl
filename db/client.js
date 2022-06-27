const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: "postgres",
  password: process.env.POSTGRES_PW,
  database: "tinyurl",
  port: process.env.POSTGRES_PORT,
});

client.connect();

module.exports = client;

//====================================================
