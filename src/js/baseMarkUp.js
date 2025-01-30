import EventsApiService from './fetchEvents';
import cardMarkUp from '../templates/card';
import { renderPagination } from './pagination';
// import { createLogger } from 'vite';


const list = document.querySelector('.cards__list');
const paginationList = document.querySelector('.pagination__list');
const searchForm = document.getElementById('header__form');
const searchInput = document.getElementById('search-input');


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

<<<<<<< HEAD
=======


searchForm.addEventListener('submit', onSearchFormSubmit)

async function onSearchFormSubmit(e) {
  e.preventDefault();

  eventsApiService.searchQuery = searchInput.value.trim();
  eventsApiService.page = 0;
  clearEventsList();
  clearPagination();

  await renderEvents();
}

async function onCountryFilterSubmit(e) {

}


>>>>>>> 58c650a0e6958c60c7c9cb623c4f6df01b489346
export default async function renderEvents() {
  try {
    const data = await eventsApiService.fetchEvents();


    window.events = data._embedded?.events || '';
    const markUp = cardMarkUp(events);

 
    handleClickEvent();

    const events = data._embedded?.events || [];
    const markUp = cardMarkUp(events);

    list.insertAdjacentHTML('beforeend', markUp);

    const totalPages = data.page.totalPages;

    console.log(
      'Total Pages:',
      totalPages,
      'Current Page:',
      eventsApiService.page
    );

    renderPagination(totalPages, eventsApiService.page, onPageClick)

  } catch (error) {
    console.error(error);
  }
}



function clearEventsList() {
  list.innerHTML = '';
}

function onPageClick(newPage) {
  if (newPage === eventsApiService.page) return;
  eventsApiService.page = newPage;

  clearEventsList();
  renderEvents();
}

function clearPagination() {
  paginationList.innerHTML = '';
}