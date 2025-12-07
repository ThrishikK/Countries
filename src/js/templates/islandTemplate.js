const islandTemplateFun = function (countryName) {
  return ` <div class="island-container">
            <h2 class="current-island">
              <span>${countryName}</span> is an Island nation.
            </h2>
            <h2>
              Countries with no land borders are primarily island nations like
              Australia, Japan, New Zealand, and Iceland, or countries with only
              a sea border.
            </h2>
          </div>
          <!--  -->
          <div class="img-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Borderless_countries.svg/1280px-Borderless_countries.svg.png"
              alt="borders"
            />
          </div>`;
};

export default islandTemplateFun;
