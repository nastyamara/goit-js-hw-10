export function fetchCountries(countryName) {
    console.log(countryName)
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
        .then((response) => response.json())
        .then((country) => renderCountryCard(country))
}