import loadCountry from "../services/getCountryDetails.js";
import borderCountryTemplateFunction from "../templates/borderCountryTemplate.js";

const populatingHtml = function (container, data) {
  container.innerHTML = "";
  const resultHtml = borderCountryTemplateFunction(data);
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
        populatingHtml(alreadyAddedBorderLoader, countryData);
      })
      .catch(function (error) {
        console.log("Error:", error.message);
      });
  });
}
