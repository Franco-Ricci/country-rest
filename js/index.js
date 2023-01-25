const toggleColor = document.getElementById("toggle-color");
const toggleIcon = document.getElementById("toggle-icon");
const toggleText = document.getElementById("toggle-text");

const formRegion = document.getElementById("form-region");
const searchInput = document.getElementById("search-input");

const cards = document.getElementById("cards");
const modalSec = document.querySelector(".modal__content");
const spinner = document.querySelector(".main__spinner")
let cardContent;


//toggle dark mode
toggleColor.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (toggleIcon.classList.contains("fa-moon")) {
    toggleIcon.classList.replace("fa-moon", "fa-sun");
    toggleText.textContent = "Light Mode";
  } else {
    toggleIcon.classList.replace("fa-sun", "fa-moon");
    toggleText.textContent = "Dark Mode";
  }
});

let count = 0;
//draw countries cards
const drawCountries = (countries) => {
  cards.textContent = "";
  const fragment = document.createDocumentFragment();
  countries.forEach((country) => {
    const card = document.createElement("div");
    card.setAttribute("id", count++);

    card.classList.add("card");
    const cardFlag = document.createElement("img");
    cardFlag.classList.add("card__img");
    cardFlag.src = country.flag;
    cardFlag.alt = "country flag"
    card.appendChild(cardFlag);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card__body");

    const cardCountry = document.createElement("h2");
    cardCountry.textContent = country.name;
    cardCountry.classList.add("card__country");

    const cardPopulation = document.createElement("p");
    cardPopulation.classList.add("card__text");
    cardPopulation.textContent = `Population: ${country.population.toLocaleString()}`;

    const cardRegion = document.createElement("p");
    cardRegion.classList.add("card__text");
    cardRegion.textContent = `Region: ${country.region}`;

    const cardCapital = document.createElement("p");
    cardCapital.classList.add("card__text");
    cardCapital.textContent = `Capital: ${country.capital}`;

    cardBody.appendChild(cardCountry);
    cardBody.appendChild(cardPopulation);
    cardBody.appendChild(cardRegion);
    cardBody.appendChild(cardCapital);
    card.appendChild(cardBody);
    fragment.appendChild(card);
  });

  cards.appendChild(fragment);
 
  showCountry(countries);
};

//modal of countries
const showCountry = (data) => {

cardContent = document.querySelectorAll(".card");
  for (let i = 0; i < data.length; i++) {
  
    cardContent[i].addEventListener("click", (e) => {
      count = 0;
      cards.textContent = "";
      console.log(cardContent[i]);
      console.log(data[i].flag);
      console.log(data[i].languages);

      let langs = data[i].languages;
      let currency = data[i].currencies;
      let border = data[i].borders !== undefined;

      console.log(border);
      console.log(langs);
      langs.map((las) => console.log(las.name));
      // cards.classList.remove("cards")

      modalSec.innerHTML = `         
            <div class="country__back">   <i class="fa-solid fa-arrow-left-long"></i>Back</div>
            <div class="country__container">
   
             <div class="country__img">
             <img class="country__flag" src=${data[i].flag} alt="country flag"></img> 
             </div>
             <div class="country__content">
            
             <h1 class="country__name">${data[i].name}</h1> 
             <div class="country__desc">
             <div class="county__list1">
             
             <p class="tittle__desc">Native Name: <span class="text__desc"> ${
               data[i].nativeName
             }</p></span>
             <p class="tittle__desc">Population: <span class="text__desc"> ${data[
               i
             ].population.toLocaleString()}</p></span>
             <p class="tittle__desc">Region: <span class="text__desc"> ${
               data[i].region
             }</p></span>
             <p class="tittle__desc">Sub Region: <span class="text__desc"> ${
               data[i].subregion
             }</p></span>
             <p class="tittle__desc">Capital: <span class="text__desc"> ${
               data[i].capital
             }</p></span></div>
             <div class="country__list2">
             <p class="tittle__desc">Top Level Domain: <span class="text__desc"> ${
               data[i].topLevelDomain
             }</p></span>
             <p class="tittle__desc">Currencies: ${
               currency !== undefined ? `${currency.map((cur) => `<span class="text__desc">${cur.name}</span>`).join(" , ")}`: `<span  class="text__desc">no currencies`
             }</span>
             <p class="tittle__desc">Languages: ${langs
               .map((lang) => `<span class="text__desc">${lang.name}</span>`)
               .join(",")}</p>
             </div>
             </div>
            <div class="country__border">
           
            <p class="tittle__desc"> Border Countries:</p>
            
            <div class="border">
            ${
              data[i].borders !== undefined
                ? `${data[i].borders
                    .map((bord) => `<p class="text__border">${bord}</p>`)
                    .join(" ")}`
                : `<p class="text__desc">No bordering countries</p>`
            }</p>
            
            </div>
            </div>
             </div>
             </div>
             `;
//button back
      let buttonBack = document.querySelector(".country__back");
      buttonBack.addEventListener("click", () => {
        console.log("si");

        cards.classList.remove("card__country--modal");
        cards.classList.add("cards");
        modalSec.textContent = "";
        spinner.classList.remove("main__spinner--off")
        fetchData();
      });
    });
  }
};

//fetch API rest 

const fetchData = async (region = "", name = "") => {
  const urlBase = "https://restcountries.com/v2";
  let urlEnd = "/all";
  if (region !== "" && region !== "default") {
    urlEnd = `/region/${region}`;
  } else if (name !== "") {
    urlEnd = `/name/${name}`;
  }

  const request = await fetch(`${urlBase}${urlEnd}`);
  const data = await request.json();

  if (request.status == 404) {
    modalSec.innerHTML = `<p class="notFound">Country not found</p>`;
    spinner.classList.add("main__spinner--off")
  }

  drawCountries(data);

  spinner.classList.add("main__spinner--off")
};

fetchData();

//search and input form
searchInput.addEventListener("keyup", (e) => {
  fetchData("", e.target.value);
  modalSec.textContent = "";
});

formRegion.addEventListener("change", (e) => {
  const region = e.target.options[e.target.selectedIndex].value;
  fetchData(region);
  modalSec.textContent = "";
});


