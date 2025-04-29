async function loadPrediction() {
    try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const gp = urlParams.get('gp');
        const year = urlParams.get('year');
        
        // Check if qualifying has happened for this race
        const checkResponse = await fetch(`/api/check-qualifying?year=${encodeURIComponent(year)}&race=${encodeURIComponent(gp)}`);
        const checkData = await checkResponse.json();
        
        if (checkData.error) {
            document.getElementById('race-title').textContent = "Error";
            document.getElementById('winner-info').textContent = checkData.error;
            return;
        }
        
        if (!checkData.qualifying_happened) {
            window.location.href = `/error.html?gp=${encodeURIComponent(gp)}&year=${encodeURIComponent(year)}`;
            return;
        }
        
        // Get prediction data with race and year parameters
        const res = await fetch(`/api/prediction?year=${encodeURIComponent(year)}&race=${encodeURIComponent(gp)}`);
        const data = await res.json();
        
        if (data.error || !data.qualifying_results || data.qualifying_results.length === 0) {
            document.getElementById('race-title').textContent = "No prediction available";
            document.getElementById('winner-info').textContent = "";
            return;
        }
        
        const winner = data.qualifying_results[0];
        const info = DRIVER_INFO[winner.Driver] || {};
        
        document.getElementById('race-title').textContent = `${data.race_name} ${data.date} Winner`;
        document.getElementById('winner-info').innerHTML = `
            <b>${winner.Driver}</b>
            ${info.country ? `<img src="https://flagcdn.com/24x18/${info.country}.png" style="vertical-align:middle;border-radius:2px;">` : ""}
            <br>Team: ${winner.TeamName || info.team || ""}
            <br>Number: ${info.number || ""}
            <br>Best Lap: ${winner.Q3 !== 'No Time' ? winner.Q3 : (winner.Q2 !== 'No Time' ? winner.Q2 : winner.Q1)}
        `;
    } catch (error) {
        console.error('Error loading prediction:', error);
        document.getElementById('race-title').textContent = "Error";
        document.getElementById('winner-info').textContent = "Failed to load prediction data";
    }
}

window.onload = loadPrediction; 