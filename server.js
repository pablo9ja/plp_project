// Backend
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Import your database connection
const { initializeDatabase, populateTables } = require('./sql');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



// Initialize and populate the database table
initializeDatabase();
populateTables();


// Add /submit-vaccination API
app.post('/submit-vaccination', (req, res) => {
    const { name, date_of_birth, phone_number, gender, vaccine_name, manufacturer, vaccination_date, status } = req.body;

    const addIndividualQuery = `
        INSERT INTO Individuals (name, date_of_birth, phone_number, gender) VALUES (?, ?, ?, ?)
    `;
    db.query(addIndividualQuery, [name, date_of_birth, phone_number, gender], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error adding individual.' });
            return;
        }

        const individualId = result.insertId;

        const addVaccineTypeQuery = `
            INSERT INTO VaccinationTypes (manufacturer, vaccine_name) VALUES (?, ?)
        `;
        db.query(addVaccineTypeQuery, [manufacturer, vaccine_name], (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Error adding vaccine type.' });
                return;
            }

            const vaccineId = result.insertId;

            const addVaccinationRecordQuery = `
                INSERT INTO VaccinationRecords (individual_id, vaccine_id, vaccination_date, status)
                VALUES (?, ?, ?, ?)
            `;
            db.query(addVaccinationRecordQuery, [individualId, vaccineId, vaccination_date, status], (err) => {
                if (err) {
                    res.status(500).json({ message: 'Error adding vaccination record.' });
                } else {
                    res.status(200).json({ message: 'Vaccination record added successfully.' });
                }
            });
        });
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
