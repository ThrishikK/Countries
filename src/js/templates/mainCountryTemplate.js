const getCurrency = function (currencyObj) {
  console.log(currencyObj);
  let currencyName = Object.keys(currencyObj)[0];
  console.log(currencyName);
  console.log(currencyObj[currencyName].name);
  return currencyObj[currencyName].name;
};

const getLanguages = function (languagesObj) {
  console.log(Object.values(languagesObj).join(","));
  return Object.values(languagesObj).join(",");
};

const mainCountryTemplateFunction = function (data) {
  // console.log(Object.keys(data.currencies)[0]);
  return ` <div class="country-details-container">
              <!--  -->
              <div class="flag-container">
                <img src="${data.flags.png}" alt="${data.flags.alt}" />
              </div>
              <!-- DETAILS-CONTAINER -->
              <div class="country-details">
                <div class="key-value-pair">
                  <p class="key">Name</p>
                  <p>:</p>
                  <p>${data.name.common}</p>
                </div>
                <div class="key-value-pair">
                  <p class="key">Capital</p>
                  <p>:</p>
                  <p>${data.capital[0]}</p>
                </div>
                <div class="key-value-pair">
                  <p class="key">Borders</p>
                  <p>:</p>
                  <p>${data.borders.length}</p>
                </div>
                <div class="key-value-pair">
                  <p class="key">Population</p>
                  <p>:</p>
                  <p>${data.population}</p>
                </div>
                <div class="key-value-pair">
                  <p class="key">Currency</p>
                  <p>:</p>
                  <p>${getCurrency(data.currencies)}</p>
                </div>
                <div class="key-value-pair">
                  <p class="key">Languages</p>
                  <p>:</p>
                  <p>${getLanguages(data.languages)}</p>

                 
                </div>
                <div class="key-value-pair">
                  <p class="key">Continent</p>
                  <p>:</p>
                  <p>${data.continents[0]}</p>
                </div>
              </div>
            </div>`;
};

export default mainCountryTemplateFunction;
