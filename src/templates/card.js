export default function cardMarkUp(events) {
  const markUp = events.map(event => {
    const imgUrl = event.images[0]?.url || '';
    const artist = event.name || 'No name available';
    const date = event.dates.start.localDate || 'Unknown date';
    const location = event._embedded?.venues[0].name || 'Unknown location';
    const eventUrl = event.url || '#';

    return `
        <li class="cards__item" data-id="${event.id}">
                <img src="${imgUrl}" alt="${artist}" class="cards__item__img">
                <h2 class="cards__item__title">
                    ${artist}
                </h2>
                <p class="cards__item__date">${date}</p>
                <a href="${eventUrl}" class="cards__item__location__link">
                    <svg class="location__item__icon">
                        <use href="/img/icons/sprite.svg#icon-location"> </use>
                    </svg>

                   ${location} </a>
            </li>
      `;
  });

  return markUp.join('');
}
