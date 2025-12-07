import { mainCountryFun } from "../components/mainCountry.js";

// REMOVING LOADER
let map = document.getElementById("map");
map.innerHTML = "";
let countryLayer; // To store highlighted country
let previousMarker = L.marker([55, 103]);

function removePreviousMarker() {
  if (previousMarker === null) return;
  map.removeLayer(previousMarker);
}

function addMarker(givenMarker, country, lat, lng) {
  givenMarker
    .addTo(map)
    .bindPopup(
      `<b class="${
        country === "Ocean" ? "ocean" : "country-name-label"
      }">${country}</b><br>Lat: ${lat.toFixed(2)}, Lng: ${lng.toFixed(2)}`
    )
    .openPopup();
}

// Function to load and show country boundary
async function highlightCountry(countryName, lat, lng) {
  try {
    const geoDataUrl =
      "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";
    const response = await fetch(geoDataUrl);
    const geoData = await response.json();
    console.log(geoData);
    // SOME COUNTRIES NAME MISMATCH
    if (countryName === "United States") {
      countryName = "United States of America";
    }
    // Find matching country
    const countryFeature = geoData.features.find(
      (f) => f.properties.name.toLowerCase() === countryName.toLowerCase()
    );

    // Remove existing highlight
    if (countryLayer) {
      map.removeLayer(countryLayer);
    }

    if (countryFeature) {
      // Add boundary layer
      countryLayer = L.geoJSON(countryFeature, {
        style: {
          color: "#4d56ac",
          weight: 3,
          fillColor: "#4d56ac",
          fillOpacity: 0.3,
        },
      }).addTo(map);
      // MARKER RELATED
      // removing previous marker
      removePreviousMarker();
      let currentMarker = L.marker([lat, lng]);
      addMarker(currentMarker, countryName, lat, lng);

      previousMarker = currentMarker;
      // Zoom to country
      map.fitBounds(countryLayer.getBounds());
    } else {
      console.log(`Country boundary not found for: ${countryName}`);
    }
  } catch (err) {
    console.error("Error loading country data:", err);
  }
}

function loadingMap() {
  map = L.map("map").setView([63.07, 90.53], 13);

  // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   attribution: "© OpenStreetMap contributors",
  // }).addTo(map);
  // TRYING SATELLITE VIEW START
  // Base Layers
  const osm = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors",
    }
  );

  const satellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles © Esri",
    }
  );

  // Add default layer (satellite)
  satellite.addTo(map);

  // Add layer control
  L.control
    .layers({ "🗺️ OSM Map": osm, "🛰️ Satellite": satellite }, null, {
      collapsed: false,
    })
    .addTo(map);
  // END TRYING SATELLITE VIEW
  // Map click event
  map.on("click", async function (e) {
    const { lat, lng } = e.latlng;
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data.address);
      const country = data.address?.country || "Ocean";
      console.log(country);
      mainCountryFun(country, true);
      // Highlight boundary
      if (country !== "Unknown") highlightCountry(country, lat, lng);
    } catch (err) {
      console.error("Error:", err);
    }
  });

  // INITIAL
  function initialLoad(country) {
    highlightCountry(country, 55, 103);
    // Marker + popup
    // addMarker(previousMarker, country, 55, 103);
  }

  initialLoad("Russia");
}

export { loadingMap, highlightCountry };
