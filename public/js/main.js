// Function to fetch and display current race information
async function fetchCurrentRaceInfo() {
    try {
        const response = await fetch('/api/prediction');
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        // Update the race information
        document.getElementById('raceName').textContent = data.race_name;
        document.getElementById('circuit').textContent = data.circuit;
        document.getElementById('raceDate').textContent = data.date;

    } catch (error) {
        console.error('Error fetching race information:', error);
        // Update UI to show error state
        document.getElementById('raceName').textContent = 'Error loading data';
        document.getElementById('circuit').textContent = 'Error loading data';
        document.getElementById('raceDate').textContent = 'Error loading data';
    }
}

// Function to handle navigation active state
function handleNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentRaceInfo();
    handleNavigation();
}); 