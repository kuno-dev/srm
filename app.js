// Check if a mode is saved in Local Storage
const savedMode = localStorage.getItem('mode');

// If a mode is saved, use that mode; otherwise, use the default mode
document.body.classList.toggle('dark-mode', savedMode === 'dark');

function toggleMode() {
    // Toggle the opposite mode to the current mode
    const isDarkMode = document.body.classList.toggle('dark-mode');

    // Save the mode in Local Storage
    localStorage.setItem('mode', isDarkMode ? 'dark' : 'light');
}

// Load configuration from config.json
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();

        // Update DOM with configuration values
        document.getElementById('pageTitle').innerText = `${config.name} | ${config.desc}`;
        document.getElementById('appName').innerHTML = `${config.name} <span id="appDesc">${config.desc}</span>`;
        document.getElementById('footerAbout').innerText = `${config.desc}`;
        document.getElementById('footerVersion').innerText = `${config.name} - Version ${config.version.major}.${config.version.minor}.${config.version.release}`;
        document.getElementById('footerCopyright').innerHTML = `&copy;${config.version.build.year} <span>${config.author.company}</span>`;

        // Fetch data from API based on the provided configuration
        await fetchData(config.api);
    } catch (error) {
        console.error('Error loading configuration:', error);
    }
}

// Fetch data from API based on the provided configuration
async function fetchData(apiConfig) {
    try {
        const response = await fetch(`${apiConfig.url}${apiConfig.request}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Process and display the data in cards
        displayDataAsCards(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display data as cards
function displayDataAsCards(data) {
    const resultContainer = document.getElementById('resultContainer');

    // Clear existing content in the resultContainer
    resultContainer.innerHTML = '';

    // Create and append cards for each item in the data
    data.clubs.forEach((club) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${club.name}</h2>
            <p>Code: ${club.code}</p>
            <p>Country: ${club.country}</p>
        `;
        resultContainer.appendChild(card);
    });
}

// Initial call to loadConfig
loadConfig();