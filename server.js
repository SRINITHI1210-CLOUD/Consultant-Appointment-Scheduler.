const express = require('express');           
const sqlite3 = require('sqlite3').verbose(); 
const bodyParser = require('body-parser');    
const cors = require('cors');                 

const app = express();
const port = 5000; 

app.use(cors());                 
app.use(bodyParser.json());      

// 1. START THE SERVER FIRST (To confirm it is "Enabled")
app.listen(port, () => {
    console.log(`✅ SERVER IS ACTIVE at http://localhost:${port}`);
});

// 2. CONNECT TO DATABASE
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
      console.error("❌ DB Error: " + err.message);
  } else {
      console.log('✅ Connected to SQLite database.');
  }
});

// 3. TABLES
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS slots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    is_booked INTEGER DEFAULT 0
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slot_id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    FOREIGN KEY(slot_id) REFERENCES slots(id)
  )`);
});

// 4. SMART ENDPOINTS
app.post('/slots', (req, res) => {
  const { date, time } = req.body;
  db.get('SELECT * FROM slots WHERE date = ? AND time = ?', [date, time], (err, row) => {
    if (row) return res.status(400).json({ error: 'Time taken!' });
    db.run('INSERT INTO slots (date, time) VALUES (?, ?)', [date, time], function(err) {
      res.status(201).json({ id: this.lastID, date, time });
    });
  });
});

app.get('/slots', (req, res) => {
  db.all('SELECT * FROM slots', [], (err, rows) => res.json(rows));
});

app.post('/book', (req, res) => {
  const { slot_id, name, email } = req.body;
  db.get('SELECT * FROM slots WHERE id = ?', [slot_id], (err, slot) => {
    if (!slot) return res.status(404).json({ error: 'Not found' });
    db.run('INSERT INTO bookings (slot_id, name, email) VALUES (?, ?, ?)', [slot_id, name, email], () => {
      // SMART UPDATE: Mark all slots with same time as booked
      db.run('UPDATE slots SET is_booked = 1 WHERE date = ? AND time = ?', [slot.date, slot.time], () => {
        res.json({ message: 'Success!' });
      });
    });
  });
});