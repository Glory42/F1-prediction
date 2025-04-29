document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission on homepage
    const form = document.querySelector('.selection-container');
    if (form) {
        form.addEventListener('change', function() {
            const gpSelect = document.getElementById('gpSelect');
            const yearSelect = document.getElementById('yearSelect');
            
            if (gpSelect && yearSelect) {
                const selectedGP = gpSelect.value;
                const selectedYear = yearSelect.value;
                
                // Check if this is a historical race or future race
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth() + 1;
                
                if (selectedYear < currentYear) {
                    // Past race - show past prediction page
                    setTimeout(() => {
                        window.location.href = `pastPrediction.html?gp=${selectedGP}&year=${selectedYear}`;
                    }, 500);
                } else if (selectedYear > currentYear) {
                    // Future race - show error page
                    setTimeout(() => {
                        window.location.href = `412Error.html?gp=${selectedGP}&year=${selectedYear}`;
                    }, 500);
                } else {
                    // Current year race
                    // This is a simplified check - in a real app you'd check against the actual F1 calendar
                    // For now we'll just check if it's Miami (May) and we're past May
                    if (selectedGP === 'miami' && currentMonth > 5) {
                        // Past race this year
                        window.location.href = `pastPrediction.html?gp=${selectedGP}&year=${selectedYear}`;
                    } else {
                        // Future race this year
                        window.location.href = `currentPrediction.html?gp=${selectedGP}&year=${selectedYear}`;
                    }
                }
            }
        });
    }
    
    // Parse URL parameters
    function getUrlParams() {
        const params = {};
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        
        return params;
    }
    
    // Display race information on prediction pages
    const params = getUrlParams();
    const raceInfoElements = document.querySelectorAll('.race-info');
    
    if (params.gp && params.year && raceInfoElements.length > 0) {
        const gpName = params.gp.charAt(0).toUpperCase() + params.gp.slice(1);
        raceInfoElements.forEach(el => {
            el.textContent = `${gpName} Grand Prix  ${params.year}`;
        });
    }
});