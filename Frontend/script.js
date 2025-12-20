const API_URL = 'http://localhost:5000'; // Updated to Port 5000

// Fetch and display all slots
async function fetchSlots() {
    try {
        const response = await fetch(`${API_URL}/slots`);
        const slots = await response.json();
        const tbody = document.querySelector('#slots-table tbody');
        tbody.innerHTML = '';

        slots.forEach(slot => {
            const row = `<tr>
                <td>${slot.id}</td>
                <td>${slot.date}</td>
                <td>${slot.time}</td>
                <td style="color: ${slot.is_booked ? 'red' : 'green'}">
                    ${slot.is_booked ? 'Booked' : 'Available'}
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    } catch (err) {
        console.error("Connection failed:", err);
    }
}

// Create a new slot
async function createSlot() {
    const date = document.getElementById('slot-date').value;
    const time = document.getElementById('slot-time').value;
    const statusMsg = document.getElementById('create-status');

    if (!date || !time) return alert("Please select date and time");

    const response = await fetch(`${API_URL}/slots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time })
    });

    if (response.ok) {
        statusMsg.innerText = "";
        fetchSlots();
    } else {
        const data = await response.json();
        statusMsg.innerText = data.error; // Shows "Time taken!" from backend
    }
}

// Book a slot
async function bookSlot() {
    const slot_id = document.getElementById('book-id').value;
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;

    const response = await fetch(`${API_URL}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot_id, name, email })
    });

    if (response.ok) {
        alert("Booking Successful!");
        fetchSlots(); // Refresh table to see all matching times turn Red
    } else {
        alert("Error: Slot already booked or invalid ID");
    }
}

// Load slots on page start
fetchSlots();