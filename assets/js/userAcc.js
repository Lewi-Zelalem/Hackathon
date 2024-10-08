import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCVIym8X-GDRx6_1256dtVZdo3hIm7TRgI",
  authDomain: "flipper-hack.firebaseapp.com",
  databaseURL: "https://flipper-hack-default-rtdb.firebaseio.com",
  projectId: "flipper-hack",
  storageBucket: "flipper-hack.appspot.com",
  messagingSenderId: "9118741906",
  appId: "1:9118741906:web:d8860d3094a46bafd37d4b",
  measurementId: "G-EYLLFHW5XS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get the username from local storage
const username = localStorage.getItem("username");
let userData;

// Function to retrieve user data
function fetchUserData(username) {
    const databaseRef = ref(database);
    get(child(databaseRef, `users/${username}`)) // Assuming your users are stored under "users"
        .then((snapshot) => {
            if (snapshot.exists()) {
                 userData = snapshot.val();
                updateUserInfo(userData);
            } else {
                console.error("No data available");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data: ", error);
        });
}

// Function to update the DOM with user information
function updateUserInfo(userData) {
    // Update the username and security code in the DOM
    const welcomeMsgUserName = document.querySelector(".Welcome-message .userName");
    const userDetailName = document.querySelector(".user-detail h1")
    const securityCodeElement = document.querySelector(".security-code");

    userDetailName.innerHTML = `${userData.firstName} ${userData.lastName}`; // Assuming username is stored in the user data
    welcomeMsgUserName.innerHTML = `${userData.firstName} ${userData.lastName}`; // Assuming username is stored in the user data
}


// Function to count members
function countMembers() {
    const membersRef = ref(database, 'users'); // Reference to the users node
    get(membersRef) // Fetch the users data
        .then((snapshot) => {
            if (snapshot.exists()) {
                let memberCount = 0; // Counter for members
                const members = snapshot.val(); // Get the users data

                for (let username in members) { // Loop through each member
                    memberCount++; // Increase the count for each member
                }

                console.log(memberCount);
                document.querySelector(".hack-members h1 .memebers-count")
                    .innerText = `${memberCount}`;
            } else {
                console.error("No members data available");
            }
        })
        .catch((error) => {
        });
}

// Function to fetch user data
// Function to fetch and display all members
function fetchMembers() {
    const membersRef = ref(database, 'users'); // Reference to the users node
    get(membersRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const members = snapshot.val(); // Get the users data
                const memberCount = Object.keys(members).length; // Count total members
                const memberCountElement = document.querySelector('.hack-members h1'); // Select the member count element

                // Update the member count display
                if (memberCountElement) {
                    memberCountElement.textContent = `${memberCount} Members`; // Update the count display
                } else {
                    console.error("Member count element not found");
                }

                // Display first five members
                const memberContainer = document.querySelector('.hack-members'); // Container for members

                // Clear existing member elements
                memberContainer.querySelectorAll('.member').forEach(member => member.remove());

                // Get the first five usernames
                const memberNames = Object.keys(members).slice(0, 5); // Get the first five usernames

                // Display the first five members
                memberNames.forEach(username => {
                    const memberElement = document.createElement('div');
                    memberElement.classList.add('member');
                    memberElement.innerHTML = `<i class="fa-solid fa-user-tie"></i><h3>${members[username].firstName} ${members[username].lastName}</h3>`; // Assuming you want to show first and last name
                    memberContainer.appendChild(memberElement); // Append member element to the container
                });
            } else {
                console.error("No members data available");
            }
        })
        .catch((error) => {
            console.error("Error fetching members data: ", error);
        });
}


// Fetch members data when the page loads
window.onload = () => {
    fetchMembers();
    fetchUserData(username);
    countMembers();
};





document.querySelector('.user-detail .fa-eye')
    .addEventListener('click', () => {
        document.querySelector('.user-detail .code')
            .innerHTML = `${userData.securityCode} <i class="fa-solid fa-eye-slash"></i>`;
    });
document.querySelector('.user .fa-eye')
    .addEventListener('click', () => {
        document.querySelector('.databse-info .code')
            .innerHTML = `${userData.securityCode} <i class="fa-solid fa-eye-slash"></i>`;
    });



    const userIcon = document.getElementById('userIcon');
const dropdownMenu = document.getElementById('dropdownMenu');

// Show dropdown on hover
userIcon.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block';
});

userIcon.addEventListener('mouseleave', () => {
    dropdownMenu.style.display = 'none';
});

// Optional: Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!userIcon.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

// Optional: Toggle dropdown on click
userIcon.addEventListener('click', () => {
    const isExpanded = userIcon.getAttribute('aria-expanded') === 'true';
    userIcon.setAttribute('aria-expanded', !isExpanded);
    dropdownMenu.style.display = isExpanded ? 'none' : 'block';
});
