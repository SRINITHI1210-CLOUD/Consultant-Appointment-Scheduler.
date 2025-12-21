Track Chosen + Why
Track: Full-Stack Development (Track E). Why: I chose this track to demonstrate my ability to build a complete end-to-end system. I wanted to master the "handshake" between a persistent SQLite database and a dynamic frontend UI to solve a real-world scheduling problem.

Features Implemented (Checklist)

Slot Creation: Consultants can add specific dates and times for availability via a simple form.

Real-Time Table View: The frontend table updates immediately after data entry without needing a page refresh.

Smart Booking Logic: Records user details (Name/Email) and updates slot status across the system.

Persistent Storage: Data is stored in a local SQLite database, ensuring it survives server restarts.

CORS Integration: The backend is configured to allow secure communication between different local ports.

 Tech Stack
Frontend: HTML5, CSS3, Vanilla JavaScript (Fetch API).

Backend: Node.js, Express.js.

Database: SQLite3.

Middlewares: CORS, Body-Parser.

4. How to Run Locally
Open your terminal in the Backend folder.

Run npm install express sqlite3 cors body-parser to install the necessary tools.

Run node server.js to start the backend.

Look for the message:  SERVER IS ACTIVE at http://localhost:5000.

The backend is fully functional on Port 5000 with SQLite. Persistent data can be verified at the /slots endpoint."

Open your index.html file in Chrome (right-click the file and select "Open with Live Server" if using VS Code).

5. API Endpoints List
GET /slots: Returns all availability slots as a JSON array.

POST /slots: Creates a new availability slot (Requires date and time).

POST /book: Records a booking and marks the specific slot as "Booked".

6. Data Model (Tables/Fields)
Table: slots
id: INTEGER (Primary Key)

date: TEXT (Required)

time: TEXT (Required)

is_booked: INTEGER (0 for Available, 1 for Booked)

Table: bookings
id: INTEGER (Primary Key)

slot_id: INTEGER (Foreign Key referencing slots)

name: TEXT (Required)

email: TEXT (Required)

7. AI Usage Log
Initial Setup: Used AI to scaffold the Express server and SQLite connection strings.

Debugging: Used AI to troubleshoot fetch errors and ensure the backend was receiving JSON data correctly.

UI Design: Used AI to generate the CSS layout for the container and table styling.

8. Trade-offs + Next Improvements
Trade-off: Used SQLite for simplicity during evaluation instead of a cloud-hosted database.

Trade-off: Focused on core functionality over complex user authentication to ensure stability.

Next Improvement: Add a dashboard for consultants to delete or edit their existing slots.

Next Improvement: Implement automated email confirmations using Nodemailer.

Next Improvement: Add frontend calendar integration for a better user experience.


