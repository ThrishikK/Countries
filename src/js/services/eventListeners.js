import { mainCountryFun } from "../components/mainCountry.js";

function borderCountryEventListener() {
  document.addEventListener("click", function (e) {
    // console.log(e.target.classList);
    if (e.target.classList.contains("borderCountryCanvas")) {
      // console.log(e.target.dataset);
      // GETTING BORDER COUNTRY CODE
      const borderCountryCodeCLicked = e.target.dataset.borderCanvasCountryCode;
      console.log(borderCountryCodeCLicked);
      // CALLING THE MAIN RENDER
      mainCountryFun(borderCountryCodeCLicked, false);
    }
  });
}

export { borderCountryEventListener };
