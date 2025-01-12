import FetchEvents from './fetchEvents';
import renderMovies from './card';
import { createLogger } from 'vite';

const list = document.getElementById('js-list');

const fetchEvents = new FetchEvents();

async function renderEvents() {
    try{
        const data = await fetchEvents.EventsApiService();

        const events = data._embedded?.events || '';
        const markUp = renderMovies(events);

        list.insertAdjacentHTML('beforeend', markUp)
    } catch(error) {
        console.error(error)
    }
}

