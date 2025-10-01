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

const borderCountryTemplateFunction = function (data) {
  // console.log(Object.keys(data.currencies)[0]);
  return `
            <div
              class="country-details-container border-country-details-container"
            >
              <!--  -->
              <div class="border-flag-container">
                <img src="${data.flags.png}" alt="${data.flags.alt}" />
              </div>
              <!-- DETAILS-CONTAINER -->
              <div class="country-details border-country-details">
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
                  <p class="key">Continent</p>
                  <p>:</p>
                  <p>${data.continents[0]}</p>
                </div>
              </div>
            </div>
         `;
};

export default borderCountryTemplateFunction;
