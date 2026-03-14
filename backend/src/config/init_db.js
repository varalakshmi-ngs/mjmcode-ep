require("dotenv").config({ path: require('path').resolve(__dirname, '../../.env') });
const mysql = require("mysql2");

// Connect without a specific database to create it first
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL successfully.");

  // Create Database
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``, (err) => {
    if (err) {
      console.error("Error creating database:", err);
      connection.end();
      return;
    }
    console.log(`Database '${process.env.DB_NAME}' checked/created.`);

    // Switch to database
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) {
        console.error("Error switching to database:", err);
        connection.end();
        return;
      }

      // Create Table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS epapers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          edition VARCHAR(255) NOT NULL,
          publish_date DATE NOT NULL,
          pdf_path VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      const createAdTableQuery = `
        CREATE TABLE IF NOT EXISTS ads (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          image_path VARCHAR(255) NOT NULL,
          link_url VARCHAR(255),
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error("Error creating 'epapers' table:", err);
        } else {
          console.log("Table 'epapers' checked/created successfully.");
        }
        
        connection.query(createAdTableQuery, (errAd) => {
          if (errAd) {
            console.error("Error creating 'ads' table:", errAd);
          } else {
            console.log("Table 'ads' checked/created successfully.");
          }

          console.log("Database initialization complete.");
          connection.end();
          process.exit(0);
        });
      });
    });
  });
});
