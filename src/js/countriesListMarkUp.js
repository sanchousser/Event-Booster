import countries from '/js/allCountries.json'

const countriesList = document.getElementById('header__form__country__select');
const countriesListText = document.querySelector('.header__form__country__button-text');

const countriesListMarkUp = countries.map(country => {
    return `
        <option class='header__form__country__option' value="${country.en}">${country.en}</option>
    `
}).join('')

countriesList.insertAdjacentHTML('beforeend', countriesListMarkUp);

// function onCountryListChange(e) {
//     const selectedValue = e.target.value;
//     countriesListText.textContent = selectedValue;

// }




export function countryListSearch(countryName) {
    return countries
    .find(country => country.en === countryName).code
}





