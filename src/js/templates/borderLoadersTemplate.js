const bordersContainer = document.getElementById("bordersContainer");
console.log(bordersContainer);

const borderLoaderHtml = function (index, code) {
  return ` <div class="border-country-container" id="borderCountryContainer-${index}" data-border-code = "${code}">
            <div class="loader-container">
              <div class="dots"><span></span><span></span><span></span></div>
            </div>
          </div>`;
};

const borderLoaderTemplateFun = function (count, borderCodes) {
  console.log(count);
  console.log(bordersContainer);
  // CLEARING BORDERS INNER HTML
  bordersContainer.innerHTML = "";
  for (let index = 0; index < count; index++) {
    const resultHtml = borderLoaderHtml(index, borderCodes[index]);
    bordersContainer.innerHTML += resultHtml;
  }
};

export default borderLoaderTemplateFun;
