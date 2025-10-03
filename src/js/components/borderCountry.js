import loadCountry from "../services/getCountryDetails.js";
import borderCountryTemplateFunction from "../templates/borderCountryTemplate.js";
import waveFlagCanvas from "../services/canvasFlag.js";

const populatingHtml = function (container, data, code) {
  container.innerHTML = "";
  const resultHtml = borderCountryTemplateFunction(data, code);
  container.innerHTML = resultHtml;
};

export async function borderCountryFun(borderCodes) {
  borderCodes.map((eachCode, index) => {
    loadCountry(eachCode, false)
      .then(function (data) {
        // TAKING 0-INDEX BECAUSE API SENDS AN ARRAY
        const countryData = data[0];
        console.log(countryData);
        // GETTING ALREADY ADDED LOADER ELEMENT
        const alreadyAddedBorderLoader = document.getElementById(
          `borderCountryContainer-${index}`
        );
        // ADDING HTML
        populatingHtml(alreadyAddedBorderLoader, countryData, eachCode);
        // CALLING WAVE FLAG FUNCTION
        const borderCountryAddress = countryData.flags.png;
        waveFlagCanvas(`borderFlagCanvas${eachCode}`, borderCountryAddress);
      })
      .catch(function (error) {
        console.log("Error:", error.message);
      });
  });
}
