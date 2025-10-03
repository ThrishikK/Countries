import { mainCountryFun } from "./components/mainCountry.js";

import { borderCountryEventListener } from "./services/eventListeners.js";

let countryName = "Russia";

//
mainCountryFun(countryName, true);
// EVENT LISTENER
borderCountryEventListener();
