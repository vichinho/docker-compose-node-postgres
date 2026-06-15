const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    await client.end();
    res.send(`Conexión exitosa a PostgreSQL: ${result.rows[0].now}`);
  } catch (error) {
    res.status(500).send(`Error conectando a la base de datos: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});
