document.addEventListener("DOMContentLoaded", () => {
    // Event listeners for forms and logout
    if (document.getElementById("signup-form")) {
        document.getElementById("signup-form").addEventListener("submit", handleSignup);
    }
    if (document.getElementById("login-form")) {
        document.getElementById("login-form").addEventListener("submit", handleLogin);
    }
    if (document.getElementById("logout-btn")) {
        document.getElementById("logout-btn").addEventListener("click", logout);
    }

    // Initialize the calendar if the calendar element exists
    if (document.getElementById("calendar")) {
        initializeCalendar();
    }

    // Initialize navigation event listeners
    initializeNavigation();
});

// Mock user data (replace with a real database in production)
const users = [
    { name: "Regular User", email: "user@example.com", password: "password", isAdmin: false },
    { name: "Admin User", email: "admin@example.com", password: "adminpassword", isAdmin: true }
];

// Handle sign up
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage("Please enter a valid email address.");
        return;
    }

    // Check for existing user
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        showMessage("Email is already registered.");
        return;
    }

    if (name && email && password) {
        // Add new user to mock data
        users.push({ name, email, password, isAdmin: false });
        showMessage("Sign up successful!");

        // Redirect to dashboard after signup
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000); // Wait 1 second before redirecting
    } else {
        showMessage("Please fill out all fields.");
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    // Validate user credentials
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        // Set user data in local storage if needed
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Redirect to dashboard after login
        setTimeout(() => {
            window.location.href = "/autoschedule_app/templates/dashboard.html";
        }, 100); // Wait 0.1 second before redirecting
    } else {
        showMessage("Invalid email or password.");
    }
}

// Show messages to users
function showMessage(message) {
    const messageElement = document.getElementById("message"); // Ensure you have an element for messages
    messageElement.innerText = message;
    messageElement.style.display = 'block'; // Display the message
}

// Logout function
function logout() {
    // Clear user data
    localStorage.removeItem("loggedInUser");
    // Redirect to landing page
    window.location.href = "/autoschedule_app/templates/index.html";
}

// Show/hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Fetch events from API (placeholder example)
async function fetchEvents() {
    try {
        const response = await fetch('/api/events'); // Adjust the endpoint as needed
        return await response.json();
    } catch (error) {
        console.error("Error fetching events:", error);
        return []; // Return an empty array on error
    }
}

// Initialize the calendar
async function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: await fetchEvents()
    });
    calendar.render();
}

// Initialize navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((navItem) => {
        navItem.addEventListener("click", () => {
            navItems.forEach((item) => {
                item.classList.remove("active");
            });
            navItem.classList.add("active");
        });
    });
}
