const API_KEY = "3vLlhLsn5MSlQI96Cy78HBPNhef1xnsS";
fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=3vLlhLsn5MSlQI96Cy78HBPNhef1xnsS")
.then(response => response.json())
.then(data => console.log(data))
