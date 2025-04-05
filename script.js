// ThingSpeak Configuration
const CHANNEL_ID = "2904961";      // Replace with your ThingSpeak Channel ID
const READ_API_KEY = "F2RFC4XJQP8ZNAZ7";  // Replace with your Read API Key

// Fetch data from ThingSpeak
async function fetchData() {
    const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.feeds && data.feeds.length > 0) {
            const latest = data.feeds[0];
            
            // Update the dashboard
            document.getElementById("ph").textContent = latest.field1 || "--";
            document.getElementById("turbidity").textContent = latest.field2 || "--";
            document.getElementById("tds").textContent = latest.field3 || "--";
            document.getElementById("temp").textContent = latest.field4 || "--";
            
            // Update timestamp
            const now = new Date();
            document.getElementById("update-time").textContent = `Last updated: ${now.toLocaleString()}`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetch data every 10 seconds
fetchData();
setInterval(fetchData, 10000);