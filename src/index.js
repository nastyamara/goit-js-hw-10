import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryCard: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
    let search = refs.input.value.trim();
    clearHtml();
    console.log(search);
    if(search !== "")
{    fetchCountries(search).then(countries => {
        if (countries.length === 1) {
            renderCountryCard(countries);
            refs.countryList.innerHTML = "";}
       else if (countries.length > 1 && countries.length <= 10)
        { renderCountryList(countries) }
        else  if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }
    }).catch((error) => {
        Notiflix.Notify.failure('"Oops, there is no country with that name"')
clearHtml()
        });}
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
        return `<li class="country-list-item"><img src=${svg} alt="Flag of ${official}" width="15" height="10"> ${official}</li>`
    }).join(' ');
    
 refs.countryList.innerHTML = listMarkup;
}

function clearHtml() {
        refs.countryCard.innerHTML = "";
        refs.countryList.innerHTML = "";
}
   



    

