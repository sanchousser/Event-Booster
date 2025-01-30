import EventsApiService from './fetchEvents';
import cardMarkUp from '../templates/card';
// import { createLogger } from 'vite';

const list = document.querySelector('.cards__list');

const eventsApiService = new EventsApiService();
renderEvents();
export default async function renderEvents() {
  try {
    const data = await eventsApiService.fetchEvents();

<<<<<<< Updated upstream
    const events = data._embedded?.events || '';
=======

    // window.events = data._embedded?.events || '';
    const events = data._embedded?.events || [];
<<<<<<< Updated upstream
>>>>>>> Stashed changes
    const markUp = cardMarkUp(events);

    handleClickEvent();

=======
    const markUp = cardMarkUp(events);
>>>>>>> Stashed changes

    handleClickEvent();


    list.insertAdjacentHTML('beforeend', markUp);
  } catch (error) {
    console.error(error);
  }
}
