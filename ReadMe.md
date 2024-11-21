# Project Structure

vaccination-records/
├── index.html/               # Static assets (CSS, JS, images)
├── sql/                  # SQL scripts for database setup
├── index.js              # Main server file
├── package.json          # Project metadata and dependencies
├── .env.example          # Environment variable template
├── .gitignore            # Ignored files
├── README.md             # Documentation

# Vaccination Records Management System

The **Vaccination Records Management System** is a web-based platform designed to manage vaccination data efficiently. It allows for the storage, retrieval, and updating of vaccination records, including details about individuals, vaccine types, and vaccination status.

---

## Features
- **Add Vaccination Records**: Input detailed vaccination information.
- **Manage Individuals**: Store and manage personal details of vaccinated individuals.
- **Database Integration**: Save data securely in a MySQL database.
- **Dynamic Forms**: Interactive front-end for ease of data entry.
- **API Support**: Seamless data submission and retrieval using RESTful APIs.

---

## Built With
- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Bootstrap
- **Database**: MySQL
- **Dependencies**:
  - `body-parser`: For parsing incoming request bodies.
  - `cors`: For cross-origin resource sharing.
  - `dotenv`: For managing environment variables.

---

## Installation

### Prerequisites
1. **Node.js** (v16+ recommended)
2. **MySQL**
3. **Git**

## Contact
Author: Imoukhedeme Paul Kehinde


# Dependencies
Backend Dependencies
The following npm packages are required to run the backend server:

Node.js: JavaScript runtime environment.
Express.js: Web framework for handling routes and middleware.

npm install express
Body Parser: Middleware to parse JSON requests (now part of Express.js).
css
npm install body-parser
CORS: Middleware for enabling Cross-Origin Resource Sharing.

npm install cors
dotenv: Loads environment variables from a .env file.

npm install dotenv
mysql2: MySQL client for Node.js.

npm install mysql2
Frontend Dependencies
## The frontend relies on the following:

Bootstrap: For responsive and styled UI components.


