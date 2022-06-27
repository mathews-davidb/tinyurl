const urlsRouter = require("../api/urls");
const client = require("./client");

let tinyURL = undefined;

//===============================================================

const createTinyURL = () => {
  var crypto = require("crypto");
  tinyURL = crypto.randomBytes(3).toString("hex");
  return tinyURL;
};

//===============================================================

const assignURL = async (linkedURL) => {
  createTinyURL();

  try {
    const resp = await client.query(
      `
        INSERT INTO urls (linked_url, tiny_URL)
        VALUES ($1, $2)
        RETURNING *
        `,
      [linkedURL, tinyURL]
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
};

// assignURL("www.secondtest.com");

//===============================================================

const getLinkedURLByTinyURL = async (tinyURL) => {
  try {
    const resp = await client.query(
      ` SELECT *
      FROM urls
      WHERE tiny_url=$1
      `,
      [tinyURL]
    );
    if (resp.rows[0]) {
      return resp.rows[0].linked_url;
    } else {
      return undefined;
    }
  } catch (error) {
    throw error;
  }
};

// getLinkedURLByTinyURL("82dda2").then(console.log);

//===============================================================

module.exports = { assignURL, getLinkedURLByTinyURL };
