document.getElementById('gpForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const gp = document.getElementById('gp').value;
    const year = document.getElementById('year').value;
    
    // Check if qualifying has happened for this race
    try {
        const response = await fetch(`/api/check-qualifying?year=${encodeURIComponent(year)}&race=${encodeURIComponent(gp)}`);
        const data = await response.json();
        
        if (data.error) {
            window.location.href = `/error.html?message=${encodeURIComponent(data.error)}`;
            return;
        }
        
        if (data.qualifying_happened) {
            // If qualifying has happened, redirect to present-forecast page
            window.location.href = `/present-forecast.html?gp=${encodeURIComponent(gp)}&year=${encodeURIComponent(year)}`;
        } else {
            // If qualifying hasn't happened, redirect to error page
            window.location.href = `/error.html?gp=${encodeURIComponent(gp)}&year=${encodeURIComponent(year)}`;
        }
    } catch (error) {
        console.error('Error checking qualifying status:', error);
        window.location.href = `/error.html?message=${encodeURIComponent('Failed to check qualifying status')}`;
    }
}); 