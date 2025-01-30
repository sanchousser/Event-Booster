const FALLBACK_INFO_TEXT = 'No additional info provided :(';

function onCardClick(eventId) {
  if (!window.events) {
    console.error("No info found");
    return;
  }

  const event = window.events.find(e => e.id === eventId);
  if (!event) {
    console.error("No info found", eventId);
    return;
  }

  const venueName = event._embedded?.venues?.[0]?.name || 'Unknown location';
  const timeZone = event.dates.timezone || 'Unknown timezone';
  const city = event._embedded.venues?.[0]?.city.name || 'Unknown city';
  const artist = event._embedded.attractions?.[0]?.name || 'Unknown artist';
  const href = event._embedded.venues?.[0]?.url || 'Unknown href';
  const ranges = event?.priceRanges;
  const standartRange = ranges?.find(r => {
    return r.type === 'standard';
  });
  const vipRange = ranges?.find(r => {
    return r.type === 'vip';
  });
  const more = event._embedded.attractions?.[0]?.url || 'Unknown more information';
  const imgCircle = event.images?.[2]?.url || 'Unknown image';
  const imgMain = event.images?.[0]?.url || 'Unknown image';

  handleInfoText(event.info);
  handleDate(event.dates.start, timeZone);
  handleLocation(city, venueName);
  handleArtist(artist);
  const cleanUpTickets = handleTickets(href);
  handlePrices(standartRange, vipRange, standartRange?.currency);
  const cleanUpMore = handleMore(more);
  handleImages(imgCircle, imgMain);




  const backdropWindow = document.getElementById('backdrop-window');
  backdropWindow.style.display = 'flex';
  backdropWindow.classList.add('show');  
  
  const modal = document.querySelector('.modal');
  setTimeout(() => modal.classList.add('open'), 10);


  handleModalClosing(cleanUpTickets, cleanUpMore);
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

  return () => {
    ticketEl.removeEventListener('click', onClickButton);
    ticketElVip.removeEventListener('click', onClickButton);
  };
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

function handleMore(href) {
  const urlEl = document.getElementById('event-more');

  urlEl.addEventListener('click', onClickButton);

  function onClickButton() {
    window.open(href, '_blank').focus();
  }

  return () => urlEl.removeEventListener('click', onClickButton);
}

function handleImages(imgCircle, imgMain) {
  const imgCircleEl = document.getElementById('img-circle');
  const imgMainEl = document.getElementById('main-img');

  imgCircleEl.setAttribute('src', imgCircle);
  imgMainEl.setAttribute('src', imgMain);
}

window.onCardClick = onCardClick;

function handleModalClosing(cleanUpTickets, cleanUpMore) {
  const overlay = document.getElementById('backdrop-window');
  const close = document.getElementById('close');
  const modal = document.querySelector('.modal');

  function closeModal() {
    modal.classList.remove('open');
    modal.classList.add('close');

    setTimeout(() => {
      overlay.style.display = 'none';
      modal.classList.remove('close');
    }, 800);

    cleanUpTickets();
    cleanUpMore();
  }

  close.addEventListener('click', closeModal, { capture: true });
  overlay.addEventListener(
    'click',
    event => {
      if (event.target === overlay) {
        closeModal();
      }
    },
    { capture: true }
  );
}
