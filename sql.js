const db = require('./db'); // Import your database connection (replace './db' with the correct path if needed)

// Function to initialize the database schema
const initializeDatabase = () => {
    const createIndividualsTable = `
        CREATE TABLE IF NOT EXISTS Individuals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            date_of_birth DATE NOT NULL,
            phone_number VARCHAR(255),
            gender ENUM('Male', 'Female', 'Other') NOT NULL
        );
    `;

    const createVaccinationTypesTable = `
        CREATE TABLE IF NOT EXISTS VaccinationTypes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            manufacturer VARCHAR(255) NOT NULL,
            vaccine_name ENUM('MMR', 'DTaP', 'Hepatitis B', 'Hib', 'Polio', 'COVID-19', 'Others') NOT NULL
        );
    `;

    const createVaccinationRecordsTable = `
        CREATE TABLE IF NOT EXISTS VaccinationRecords (
            id INT AUTO_INCREMENT PRIMARY KEY,
            individual_id INT NOT NULL,
            vaccine_id INT NOT NULL,
            vaccination_date DATE NOT NULL,
            status ENUM('Completed', 'Pending') NOT NULL,
            FOREIGN KEY (individual_id) REFERENCES Individuals(id) ON DELETE CASCADE,
            FOREIGN KEY (vaccine_id) REFERENCES VaccinationTypes(id) ON DELETE CASCADE
        );
    `;

    db.query(createIndividualsTable, (err) => {
        if (err) {
            console.error('Error creating Individuals table:', err);
            return;
        }
        console.log('Individuals table ensured');

        db.query(createVaccinationTypesTable, (err) => {
            if (err) {
                console.error('Error creating VaccinationTypes table:', err);
                return;
            }
            console.log('VaccinationTypes table ensured');

            db.query(createVaccinationRecordsTable, (err) => {
                if (err) {
                    console.error('Error creating VaccinationRecords table:', err);
                    return;
                }
                console.log('VaccinationRecords table ensured');
            });
        });
    });
};

// Function to populate the database with sample data
const populateTables = () => {
    const insertIndividualsQuery = `
        INSERT INTO Individuals (name, date_of_birth, phone_number, gender) 
        VALUES 
            ('Alice Johnson', '1995-04-25', '555-1234', 'Female'),
            ('Bob Smith', '1988-11-12', '555-5678', 'Male');
    `;

    db.query(insertIndividualsQuery, (err) => {
        if (err) {
            console.error('Error populating Individuals table:', err);
            return;
        }
        console.log('Sample data inserted into Individuals table');

        const insertVaccinationTypesQuery = `
            INSERT INTO VaccinationTypes (manufacturer, vaccine_name) 
            VALUES 
                ('Pfizer', 'COVID-19'),
                ('Moderna', 'COVID-19'),
                ('Sanofi Pasteur', 'MMR'),
                ('GSK', 'DTaP'),
                ('Merck', 'Hepatitis B'),
                ('Pfizer', 'Polio');
        `;

        db.query(insertVaccinationTypesQuery, (err) => {
            if (err) {
                console.error('Error populating VaccinationTypes table:', err);
                return;
            }
            console.log('Sample data inserted into VaccinationTypes table');

            const insertVaccinationRecordsQuery = `
                INSERT INTO VaccinationRecords (individual_id, vaccine_id, vaccination_date, status) 
                VALUES 
                    (1, 1, '2024-01-15', 'Completed'),
                    (1, 4, '2024-02-20', 'Pending'),
                    (2, 2, '2024-01-10', 'Completed'),
                    (2, 3, '2024-03-05', 'Pending');
            `;

            db.query(insertVaccinationRecordsQuery, (err) => {
                if (err) {
                    console.error('Error populating VaccinationRecords table:', err);
                } else {
                    console.log('Sample data inserted into VaccinationRecords table');
                }
            });
        });
    });
};

module.exports = { initializeDatabase, populateTables };
