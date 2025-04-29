const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Open (or create) the database file
const db = new sqlite3.Database(path.join(__dirname, '../f1_prediction.db'));

// Create tables based on the ER diagram
const createTables = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Races (
      race_id INTEGER PRIMARY KEY AUTOINCREMENT,
      circuit VARCHAR(100),
      date DATE,
      country VARCHAR(100)
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS qualifying_results (
      result_id INTEGER PRIMARY KEY AUTOINCREMENT,
      race_id INTEGER,
      driver VARCHAR(100),
      position INTEGER,
      lap_time FLOAT,
      session INTEGER,
      FOREIGN KEY (race_id) REFERENCES Races(race_id)
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS Models (
      model_id INTEGER PRIMARY KEY AUTOINCREMENT,
      version VARCHAR(50),
      training_date DATE,
      accuracy FLOAT
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS Predictions (
      prediction_id INTEGER PRIMARY KEY AUTOINCREMENT,
      race_id INTEGER,
      model_id INTEGER,
      predicted_winner VARCHAR(100),
      actual_winner VARCHAR(100),
      confidence FLOAT,
      last_updated DATE,
      FOREIGN KEY (race_id) REFERENCES Races(race_id),
      FOREIGN KEY (model_id) REFERENCES Models(model_id)
    );`);
  });
};

// Call the function to create tables
createTables();

module.exports = db;