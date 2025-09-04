import mysql from "mysql2/promise";

let connection;

export async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      uri: process.env.DB_URI,
      ssl: {
        ca: process.env.DB_CA_CERT,
      },
    });
    console.log("Database connected");
  }
  return connection;
}
