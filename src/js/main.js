import { mainCountryFun } from "./components/mainCountry.js";
import { loadingMap } from "./services/loadLeafLet.js";

import { borderCountryEventListener } from "./services/eventListeners.js";

let countryName = "Russia";

//MAIN
mainCountryFun(countryName, true);
// MAP
loadingMap();
// EVENT LISTENER
borderCountryEventListener();
