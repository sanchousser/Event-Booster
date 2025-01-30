import EventsApiService from './fetchEvents';
import cardMarkUp from '../templates/card';
import { renderPagination } from './pagination';
import { countryListSearch } from './countriesListMarkUp';
// import { createLogger } from 'vite';


const list = document.querySelector('.cards__list');
const paginationList = document.querySelector('.pagination__list');
const searchForm = document.getElementById('header__form');
const searchInput = document.getElementById('search-input');
const countriesList = document.getElementById('header__form__country__select');
const countriesListText = document.querySelector('.header__form__country__button-text');
const cardsList = document.querySelector('.cards__list');
const emptyText = document.querySelector('.cards__empty-text');


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


searchForm.addEventListener('submit', onSearchFormSubmit);

countriesList.addEventListener('change', onCountryListTextContentChange);

async function onCountryListTextContentChange(e) {
  e.preventDefault();

  const selectedValue = e.target.value;
  countriesListText.textContent = selectedValue;

  eventsApiService.searchCountry = countryListSearch(e.target.value)


  eventsApiService.page = 0;
  clearEventsList();
  clearPagination();
  clearEmptyList();

  await renderEvents();
}


async function onSearchFormSubmit(e) {
  e.preventDefault();

  eventsApiService.searchQuery = searchInput.value.trim();
  eventsApiService.page = 0;
  clearEventsList();
  clearPagination();
  clearEmptyList();

  await renderEvents();
}



export default async function renderEvents() {
  try {
    const data = await eventsApiService.fetchEvents();

    const events = data._embedded?.events || emptyList();
    window.events = events;
    const markUp = cardMarkUp(events);


    list.insertAdjacentHTML('beforeend', markUp);

    handleClickEvent();

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
  clearEmptyList();
  renderEvents();
}

function clearPagination() {
  paginationList.innerHTML = '';
}

function emptyList() {
  cardsList.innerHTML = ''
  emptyText.style.display = 'flex'
}

function clearEmptyList() {
  emptyText.style.display = 'none'

}