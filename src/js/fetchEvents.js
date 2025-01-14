export default class EventsApiService {
  #API_KEY = '3vLlhLsn5MSlQI96Cy78HBPNhef1xnsS';
  #API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

  constructor() {
    this.page = 0;
    this.pageSize = 12;
  }

  async fetchEvents() {
    const searchParams = new URLSearchParams({
      apikey: this.#API_KEY,
      page: this.page,
      size: this.pageSize,
    });
    const url = `${this.#API_URL}?${searchParams}&classificationName=music`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    return response.json();
  }
}

// fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=3vLlhLsn5MSlQI96Cy78HBPNhef1xnsS')
