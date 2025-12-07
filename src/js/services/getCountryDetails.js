const URL_BY_NAME = `https://restcountries.com/v3.1/name`;
const URL_BY_CODE = `https://restcountries.com/v3.1/alpha`;

const loadCountry = async function (country, byName) {
  console.log(country);
  try {
    let URL = byName
      ? `${URL_BY_NAME}/${country}`
      : `${URL_BY_CODE}/${country}`;

    const response = await fetch(URL);

    // Handle HTTP errors manually
    if (!response.ok) {
      throw new Error(
        `Country not found: ${country} (status ${response.status})`
      );
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error; // rethrow to be caught later
  }
};

export default loadCountry;
