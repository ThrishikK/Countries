import loadCountry from "../services/getCountryDetails.js";
import mainCountryTemplateFunction from "../templates/mainCountryTemplate.js";
import loaderOneTemplateFun from "../templates/loaderOneTemplate.js";
import borderLoaderTemplateFun from "../templates/borderLoadersTemplate.js";
import { borderCountryFun } from "./borderCountry.js";
import waveFlagCanvas from "../services/canvasFlag.js";
import { highlightCountry } from "../services/loadLeafLet.js";

// let countryName = "India";

const mainCountryContainer = document.getElementById("mainCountryContainer");
const bordersContainer = document.getElementById("bordersContainer");

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
      const countryData = countryName === "India" ? data[1] : data[0];
      // console.log(countryData);
      if (countryBoolen === false) {
        // console.log("Border Clicked");
        // console.log(countryData);
        const leafLetCountryName = countryData.name.common;
        // console.log(leafLetCountryName);
        const [leafLetLat, leafLetLng] = countryData.latlng;
        // console.log(leafLetLat, leafLetLng);

        highlightCountry(leafLetCountryName, leafLetLat, leafLetLng);
      }

      const mainCountryAddress = countryData.flags.png;
      // console.log(mainCountryAddress);
      // FILLING MAIN COUNTRY TEMPLATE
      const resultHtml = mainCountryTemplateFunction(countryData);
      // GETTING BORDERS COUNT AND BORDER CODES
      const borderCodes = countryData.borders;
      console.log(borderCodes);
      if (borderCodes !== undefined && borderCodes.length > 0) {
        const bordersCount = borderCodes.length;
        // console.log(bordersCount);
        borderLoaderTemplateFun(bordersCount, borderCodes);
        // ADDED BORDERS LOADERS ABOVE NOW ADDING BORDER COUNTRY DETAILS
        borderCountryFun(borderCodes);
      } else {
        // CLEARING BORDERS CONTAINER IF NO BORDERS
        bordersContainer.innerHTML = "";
      }
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
