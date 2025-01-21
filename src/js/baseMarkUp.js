import EventsApiService from './fetchEvents';
import cardMarkUp from '../templates/card';
// import { createLogger } from 'vite';

const list = document.querySelector('.cards__list');

const eventsApiService = new EventsApiService();
renderEvents();
export default async function renderEvents() {
  try {
    const data = await eventsApiService.fetchEvents();

    const events = data._embedded?.events || '';
    const markUp = cardMarkUp(events);

    list.insertAdjacentHTML('beforeend', markUp);
  } catch (error) {
    console.error(error);
  }
}
