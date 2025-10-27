import loadCountry from "../services/getCountryDetails.js";
import mainCountryTemplateFunction from "../templates/mainCountryTemplate.js";
import loaderOneTemplateFun from "../templates/loaderOneTemplate.js";
import borderLoaderTemplateFun from "../templates/borderLoadersTemplate.js";
import { borderCountryFun } from "./borderCountry.js";
import waveFlagCanvas from "../services/canvasFlag.js";

// let countryName = "India";

const mainCountryContainer = document.getElementById("mainCountryContainer");

export async function mainCountryFun(countryName, countryBoolen) {
  // CLEARING HTML
  mainCountryContainer.innerHTML = "";
  // ADDING LOADER
  const loaderHtml = loaderOneTemplateFun();
  mainCountryContainer.innerHTML = loaderHtml;
  loadCountry(countryName, countryBoolen)
    .then(function (data) {
      console.log(data);
      // TAKING 0-INDEX BECAUSE API SENDS AN ARRAY
      const countryData = data[0];
      const mainCountryAddress = countryData.flags.png;
      // FILLING MAIN COUNTRY TEMPLATE
      const resultHtml = mainCountryTemplateFunction(countryData);
      // GETTING BORDERS COUNT AND BORDER CODES
      const borderCodes = countryData.borders;
      const bordersCount = borderCodes.length;
      // console.log(bordersCount);
      borderLoaderTemplateFun(bordersCount, borderCodes);
      // ADDED BORDERS LOADERS ABOVE NOW ADDING BORDER COUNTRY DETAILS
      borderCountryFun(borderCodes);
      // REMOVING LOADER AND ADDING COUNTRY DATA
      mainCountryContainer.innerHTML = "";
      mainCountryContainer.innerHTML = resultHtml;
      // console.log(resultHtml);
      // WAVING FLAG
      waveFlagCanvas("mainFlagCanvas", mainCountryAddress);
    })
    .catch(function (error) {
      console.log("Error:", error.message);
    });
}
