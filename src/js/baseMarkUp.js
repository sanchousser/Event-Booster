import EventsApiService from './fetchEvents';
import cardMarkUp from '../templates/card';
// import { createLogger } from 'vite';

const list = document.querySelector('.cards__list');

const eventsApiService = new EventsApiService();
renderEvents();

function handleClickEvent() {
  const cards = document.querySelectorAll('.cards__item');
  cards.forEach(card => {
    card.addEventListener(
      'click',
      event => {
        const cardEl = event.target; 
        const eventId = cardEl.getAttribute("data-id");

        if (eventId) {
          onCardClick(eventId);
        }
      },
      { capture: true }
    );
  });
}



export default async function renderEvents() {
  try {
    const data = await eventsApiService.fetchEvents();

    window.events = data._embedded?.events || '';
    const markUp = cardMarkUp(events);

    list.insertAdjacentHTML('beforeend', markUp);
    handleClickEvent();
  } catch (error) {
    console.error(error);
  }
}
