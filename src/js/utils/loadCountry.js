const URL_BY_NAME = `https://restcountries.com/v3.1/name`;
const URL_BY_CODE = `https://restcountries.com/v3.1/alpha`;

let countryName = "Bharrat"; // ✅ Valid country

const loadCountry = async function (countryName) {
  try {
    const response = await fetch(`${URL_BY_NAME}/${countryName}`);

    // Handle HTTP errors manually
    if (!response.ok) {
      throw new Error(
        `Country not found: ${countryName} (status ${response.status})`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // rethrow to be caught later
  }
};

loadCountry(countryName)
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log("Error:", error.message);
  });
