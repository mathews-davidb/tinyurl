const client = require("./client");

async function dropTables() {
  try {
    await client.query(`
        DROP TABLE IF EXISTS urls;
        `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    await client.query(`
        CREATE TABLE urls (
            id SERIAL PRIMARY KEY,
            linked_url VARCHAR(255) UNIQUE NOT NULL,
            tiny_url VARCHAR (255) UNIQUE NOT NULL
        )
        `);
  } catch (error) {
    throw error;
  }
}

dropTables();
createTables();
