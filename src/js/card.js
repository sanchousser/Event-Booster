export default function renderMovies(events) {
    const markUp = events.map(event => {
        const imgUrl = event.images[0]?.url || '';
        const artist = event.name[0] || 'No name available';
        const date = event.dates.start.localDate || 'Unknown date';
        const location = event._embedded?.venues[0].name || 'Unknown location';
        const eventUrl = event.url || '#'
    })
}