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
