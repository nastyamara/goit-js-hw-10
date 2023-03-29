import './css/styles.css';
// import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryCard: document.querySelector('.country-info'),
};

console.log(refs.countryList)

refs.input.addEventListener('input', onInputChange)
//addEventListener на форму {submi on submit button {prevent default; fetch, then}}

function onInputChange(event) {
    const search = event.currentTarget.value;
    console.log(search);
    fetchCountries(search);
    // renderCountryCard()
 }

function fetchCountries(countryName) {
    console.log(countryName)
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
        .then((response) => response.json())
        .then((countries) => {
           
            renderCountryList(countries)
        })
}
     
function renderCountryCard(countries) {
    const country = countries[0];
    const cardMarkup = `
 <img src="${country.flags.svg}" alt="Flag of ${country.name}" width="30 height="20"> 
    <h1>${country.name.official}</h1>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Languges: ${Object.values(country.languages).join(', ')}</p>`;
    
 
    
    refs.countryCard.innerHTML = cardMarkup;
}

function renderCountryList(countries) {

    let listMarkup = countries.map(({ name:{official}, flags: {svg}}) => {
        return `<li><img src=${svg} alt="Flag of ${official}" width="15" height="10"> ${official}</li>`
    }).join(' ');
    
 refs.countryList.innerHTML = listMarkup;
}
   



    

