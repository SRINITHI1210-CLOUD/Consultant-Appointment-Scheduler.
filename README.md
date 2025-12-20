
Consultant Appointment Scheduler (Track E)
1. Track Chosen + Why
Track E: Production-Minded Appointment Scheduling System. I chose this track to demonstrate how to handle shared availability. In a real-world scenario, a consultant might be available across multiple platforms, but once one slot is booked, they are busy for everyone. My logic ensures that booking one instance of a time slot updates all related records to "Booked" instantly.

2. Features Implemented
[x] Smart Syncing Logic: When a user books a slot at "10:00 AM", the system finds all other entries for that same time and marks them as "Booked" globally.

[x] Conflict Prevention: Backend check to prevent creating two slots for the same date/time.

[x] Two-Tier Architecture: Clean separation between the Node.js/Express backend and the Vanilla JS frontend.

[x] Data Persistence: Uses SQLite3 so that appointments remain saved even if the server restarts.

[x] Dynamic UI: Real-time table updates that color-code availability (Red for Booked, Green for Available).

3. Tech Stack
Frontend: HTML5, CSS3, JavaScript (Fetch API)

Backend: Node.js, Express.js

Database: SQLite3

4. How to Run Locally
Prepare the Backend:

Bash

cd backend
npm install
node server.js
Launch the Frontend: Open the frontend folder and open index.html in any browser.

5. API Endpoints List
GET /slots: Returns all time slots.

POST /slots: Creates a new slot.

POST /book: Books a slot and triggers the global "Booked" status for matching timestamps.

6. Data Model
Table slots: id, date, time, is_booked (0 or 1).

Table bookings: id, slot_id, name, email.

7. AI Usage Log
I used Gemini to architect the "Global Sync" logic. The AI helped me write the SQL UPDATE query that targets the date and time columns specifically, ensuring that booking logic isn't just tied to a single ID, but to the actual time of the appointment.

8. Trade-offs + Next Improvements
Trade-off: I used a local SQLite file instead of a cloud database (like MongoDB) to make it easier for the evaluator to run the project without setting up environment variables.

Improvement: Add User Authentication so only the consultant can add new slots.

Improvement: Add Email Notifications to confirm bookings to the user.