export default class EventsApiService {
    #API_KEY = "3vLlhLsn5MSlQI96Cy78HBPNhef1xnsS";
    #API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=3vLlhLsn5MSlQI96Cy78HBPNhef1xnsS';


    constructor() {
        this.page = 1;
        this.pageSize = 8
    }
}


async fetchEvents() {
    const searchParams = new URLSearchParams({
        apikey: this.#API_KEY,
        page: this.page,
        size: this.size,
    });
    const url = ``
}

