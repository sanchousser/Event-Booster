const FALLBACK_INFO_TEXT = 'No additional info provided :(';

function onCardClick(eventId) {
  const event = window.events.find(e => {
    return e.id === eventId;
  });

  const venueName = event._embedded?.venues[0].name || 'Unknown location';
  const timeZone = event.dates.timezone;
  const city = event._embedded.venues[0].city.name || 'Unknown city';
  const artist = event._embedded.attractions[0].name;
  const href = event._embedded.venues[0].url;
  const ranges = event?.priceRanges;
  const standartRange = ranges?.find(r => {
    return r.type === "standard" 
  })
  const vipRange = ranges?.find(r => {
    return r.type === "vip" 
  })
  handleInfoText(event.info);
  handleDate(event.dates.start, timeZone);
  handleLocation(city, venueName);
  handleArtist(artist);
  handleTickets(href);
  handlePrices(standartRange, vipRange, standartRange?.currency)

  const backdropWindow = document.getElementById('backdrop-window');
  backdropWindow.style.display = 'flex';
}

function handleInfoText(text = FALLBACK_INFO_TEXT) {
  const infoText = document.getElementById('text-information');
  if (text.length >= 132) {
    infoText.innerText = text?.slice(0, 132) + '...';
  } else {
    infoText.innerText = text;
  }
}

function handleDate(date, timezone) {
  const eventDate = document.getElementById('event-date');
  const eventTime = document.getElementById('event-time');

  const formattedDate = formatDateToYYYYMMDD(date.localDate);
  const formattedTime = formatTimeToHoursAndMinutes(date.localTime);

  eventDate.textContent = formattedDate;
  eventTime.textContent = `${formattedTime} (${timezone.replace('_', ' ')})`;

  function formatDateToYYYYMMDD(localDate) {
    const [year, month, day] = localDate.split('-');
    return `${year}-${month}-${day}`;
  }

  function formatTimeToHoursAndMinutes(localTime) {
    const [hours, minutes] = localTime.split(':');
    return `${hours}:${minutes}`;
  }
}

function handleLocation(city, venueName) {
  const eventCity = document.getElementById('event-city');
  const eventPlace = document.getElementById('event-place');

  eventCity.innerText = city;
  eventPlace.innerText = venueName;
}

function handleArtist(artist) {
  const artistEl = document.getElementById('event-performer');
  artistEl.innerText = artist;
}

function handleTickets(href) {
  const ticketEl = document.getElementById('event-ticket');
  const ticketElVip = document.getElementById('event-ticket-vip');
  ticketEl.href = href;
  ticketElVip.href = href;

  ticketEl.addEventListener('click', onClickButton);
  ticketElVip.addEventListener('click', onClickButton);

  function onClickButton() {
    window.open(href, '_blank').focus();
  }
}

function handlePrices(standartRange, vipRange, currency) {
  const standartPriceEl = document.getElementById('standart-price');
  const standartPriceContainer = document.getElementById('standart-ticket');
  const vipPriceEl = document.getElementById('vip-ticket');
  const vipPriceContainer = document.getElementById('vip-price');
  const vipBtnEl = document.getElementById('event-ticket-vip');


  if (standartRange) {
    standartPriceContainer.style.display = 'flex';
    standartPriceEl.innerText = `Standart ${standartRange.min} - ${standartRange.max} ${currency}`;
  }

  if (vipRange) {
    vipPriceContainer.style.display = 'flex';
    vipBtnEl.style.display = 'flex';
    vipPriceEl.innerText = `Vip ${vipRange.min} - ${vipRange.max} ${currency}`;
  }


}

window.onCardClick = onCardClick;

function handleModalClosing() {
  const overlay = document.getElementById('backdrop-window');
  const close = document.getElementById('close');

  close.addEventListener('click', onClick, { capture: true });
  overlay.addEventListener('click', onClick, { capture: true });

  function onClick(event) {
    const backdropWindow = document.getElementById('backdrop-window');
    if (
      event.target == close ||
      event.target == overlay ||
      close.contains(event.target)
    ) {
      backdropWindow.style.display = 'none';
    }
  }
}

handleModalClosing();
