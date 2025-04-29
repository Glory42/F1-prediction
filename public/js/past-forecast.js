async function loadPastForecast() {
    try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const gp = urlParams.get('gp');
        const year = urlParams.get('year');
        
        if (!gp || !year) {
            document.getElementById('race-title').textContent = "Error";
            document.getElementById('winner-info').textContent = "Missing race or year parameter";
            return;
        }
        
        // Get past forecast data
        const res = await fetch(`/api/past-forecast?year=${encodeURIComponent(year)}&race=${encodeURIComponent(gp)}`);
        const data = await res.json();
        
        if (data.error) {
            document.getElementById('race-title').textContent = "Error";
            document.getElementById('winner-info').textContent = data.error;
            return;
        }
        
        if (!data.predicted_winner || !data.actual_winner) {
            document.getElementById('race-title').textContent = "No data available";
            document.getElementById('winner-info').textContent = "";
            return;
        }
        
        const predictedInfo = DRIVER_INFO[data.predicted_winner] || {};
        const actualInfo = DRIVER_INFO[data.actual_winner] || {};
        
        document.getElementById('race-title').textContent = `${gp} ${year} Winner`;
        document.getElementById('winner-info').innerHTML = `
            <b>Predicted Winner:</b><br>
            ${data.predicted_winner}
            ${predictedInfo.country ? `<img src="https://flagcdn.com/24x18/${predictedInfo.country}.png" style="vertical-align:middle;border-radius:2px;">` : ""}
            <br>Team: ${predictedInfo.team || ""}
            <br>Number: ${predictedInfo.number || ""}
            <br><br>
            <b>Actual Winner:</b><br>
            ${data.actual_winner}
            ${actualInfo.country ? `<img src="https://flagcdn.com/24x18/${actualInfo.country}.png" style="vertical-align:middle;border-radius:2px;">` : ""}
            <br>Team: ${actualInfo.team || ""}
            <br>Number: ${actualInfo.number || ""}
        `;
    } catch (error) {
        console.error('Error loading past forecast:', error);
        document.getElementById('race-title').textContent = "Error";
        document.getElementById('winner-info').textContent = "Failed to load past forecast data";
    }
}

window.onload = loadPastForecast; 