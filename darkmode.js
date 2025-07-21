document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    // Set initial state
    const saved = localStorage.getItem('campusSafetyDarkMode');
    if (saved === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    // Toggle handler
    if (darkModeToggle) {
        darkModeToggle.onclick = () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('campusSafetyDarkMode', isDark ? 'dark' : 'light');
            darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        };
    }
});