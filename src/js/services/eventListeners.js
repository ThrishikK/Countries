import { mainCountryFun } from "../components/mainCountry.js";

function borderCountryEventListener() {
  document.addEventListener("click", function (e) {
    // console.log(e.target.classList);
    if (e.target.classList.contains("borderCountryCanvas")) {
      // console.log(e.target.dataset);
      const borderCountryCodeCLicked = e.target.dataset.borderCanvasCountryCode;
      console.log(borderCountryCodeCLicked);
      mainCountryFun(borderCountryCodeCLicked, false);
    }
  });
}

export { borderCountryEventListener };
