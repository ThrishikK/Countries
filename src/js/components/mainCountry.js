import loadCountry from "../services/getCountryDetails.js";
import mainCountryTemplateFunction from "../templates/mainCountryTemplate.js";
import loaderOneTemplateFun from "../templates/loaderOneTemplate.js";
import borderLoaderTemplateFun from "../templates/borderLoadersTemplate.js";
import { borderCountryFun } from "./borderCountry.js";
import waveFlagCanvas from "../services/canvasFlag.js";
import { highlightCountry } from "../services/loadLeafLet.js";
import islandTemplateFun from "../templates/islandTemplate.js";

// let countryName = "India";

const mainCountryContainer = document.getElementById("mainCountryContainer");
const bordersContainer = document.getElementById("bordersContainer");
const mainCountryHeadingElement = document.getElementById(
  "mainCountryHeadingElement"
);

const exceptionsList = [
  { name: "India", index: 1 },
  { name: "United States", index: 1 },
];

const getIndexForCountry = function (countryName) {
  const exception = exceptionsList.find(
    (item) => item.name.toLowerCase() === countryName.toLowerCase()
  );
  return exception ? exception.index : 0;
};

export async function mainCountryFun(countryName, countryBoolen) {
  console.log(countryName);
  // UPDATING HEADING
  mainCountryHeadingElement.textContent = countryName;
  // CLEARING HTML
  mainCountryContainer.innerHTML = "";
  // ADDING LOADER
  const loaderHtml = loaderOneTemplateFun();
  mainCountryContainer.innerHTML = loaderHtml;
  loadCountry(countryName, countryBoolen)
    .then(function (data) {
      console.log(data);
      // TAKING 0-INDEX BECAUSE API SENDS AN ARRAY

      const countryData = data[getIndexForCountry(countryName)];
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
        console.log("This country has 0 borders");
        // CHECKING IF ISLAND NATION
        const islandHtml = islandTemplateFun(countryData.name.common);
        bordersContainer.innerHTML = islandHtml;
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
