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

const borderCountryTemplateFunction = function (data, code) {
  // console.log(Object.keys(data.currencies)[0]);
  // console.log(code);
  return `
            <div
              class="country-details-container border-country-details-container"
            >
              <!--  -->
              <div class="border-flag-container">
               <canvas class="borderCountryCanvas" 
               data-border-canvas-country-code="${code}"
               id="borderFlagCanvas${code}" width="350" height="250">
                 </canvas>
              </div>
              <!-- DETAILS-CONTAINER -->
              <div class="country-details border-country-details">
                <div class="key-value-pair">
                  <p class="key">Name</p>
                  <p class="colon">:</p>
                  <p class="value">${data.name.common}</p>
                </div>
                <div class="key-value-pair">
                  <p class="key">Capital</p>
                  <p class="colon">:</p>
                  <p class="value">${data.capital[0]}</p>
                </div>
                <div class="key-value-pair">
                  <p class="key">Continent</p>
                  <p class="colon">:</p>
                  <p class="value">${data.continents[0]}</p>
                </div>
              </div>
            </div>
         `;
};

export default borderCountryTemplateFunction;
