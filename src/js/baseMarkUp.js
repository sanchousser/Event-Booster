import EventsApiService from './fetchEvents';
import cardMarkUp from '../templates/card';
import { renderPagination } from './pagination';
// import { createLogger } from 'vite';

const list = document.querySelector('.cards__list');
const paginationList = document.querySelector('.pagination__list');


const eventsApiService = new EventsApiService();
renderEvents();
export default async function renderEvents() {
  try {
    const data = await eventsApiService.fetchEvents();

    const events = data._embedded?.events || '';
    const markUp = cardMarkUp(events);

    list.insertAdjacentHTML('beforeend', markUp);
    const totalPages = data.page.totalPages;
    renderPagination(totalPages, eventsApiService.page, onPageClick)
  } catch (error) {
    console.error(error);
  }
}

function clearEventsList() {
  list.innerHTML = '';
}

function onPageClick(newPage) {
  if (newPage = eventsApiService.page) return;
  EventsApiService.page = newPage;

  clearEventsList();
  renderEvents();
}
