let search = document.querySelector(".search-div");
let next_div = document.querySelector(".Next-div");
let card = document.querySelector(".card-container");
let abilityName = [];
let abilityDetail = [];

let Default_url = "https://pokeapi.co/api/v2/pokemon/";

search.innerHTML = ``;

function cardCreate() {
  card.innerHTML = ``;
  card.innerHTML += `<div class="card">
  <div class="card-head">
  <div class="pokemon-name">
    <p></p>
  </div>
  <div class="type"></div>
  </div>
  <div class="image-container"></div>
  <div class="description">
    <div class="Ability">
      <p class="Ability-head"></p>
      <p class="Ability-details"></p>
    </div>
    <div class="Ability Abilty-2">
      <p class="Ability-head"></p>
      <p class="Ability-details"></p>
    </div>
  </div>
</div>`;
}

function getApi(url) {
  search.innerHTML = ``;
  next_div.innerHTML = ``;
  fetch(url)
    .then((request) => request.json())
    .then((request) => {
      let pokemon = request.results;
      pokemon.forEach((btn) => {
        search.innerHTML += `<button onclick = "pokemonDetail('${btn.url}')" class= "search-btn">${btn.name}</button>`;
      });
      if (request.previous) {
        next_div.innerHTML += `<button onclick="getApi('${request.previous}')" class= "search-btn">Previous</button>`;
      }
      next_div.innerHTML += `<button onclick="getApi('${request.next}')" class= "search-btn">Next</button>`;
    });
}

getApi(Default_url);

function pokemonDetail(url) {
  cardCreate();
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Make sure data comes throufg
      // console.log(data);
      document.querySelector(".pokemon-name").innerHTML = data.name;
      document.querySelector(".image-container").innerHTML = `
      <img class="image" src="${data.sprites.other["official-artwork"].front_default} ">
      `;

      let pokemonTypes = data.types;
      // console.log(pokemonTypes);
      let typeContainer = document.querySelector(".type");
      typeContainer.innerHTML = ``;

      pokemonTypes.forEach((Types) => {
        let { type } = Types;
        // console.log(type.name);
        typeContainer.innerHTML += `<img class="img-type" src="./images/types/GO_${type.name}.webp" alt="" />`;
      });

      fetch(data.species.url)
        .then((response) => response.json())
        .then((data) => {
          // Habitat
          let pokemonHabitat = document.querySelector(".image-container");
          // console.log(data.habitat.name);

          // To see if the pokemon have a habitat
          if (data.habitat) {
            pokemonHabitat.style.background = `url("./images/habitats/${data.habitat.name}.png")`;
            pokemonHabitat.style.backgroundRepeat = "no-repeat";
            pokemonHabitat.style.backgroundPositionY = "center";
            pokemonHabitat.style.backgroundSize = "cover";
          } else {
            pokemonHabitat.style.background = `url("./images/habitats/null.png")`;
            pokemonHabitat.style.backgroundRepeat = "no-repeat";
            pokemonHabitat.style.backgroundPositionY = "center";
            pokemonHabitat.style.backgroundSize = "cover";
          }
          // color picker
          // Make sure data comes throufg
          // console.log(data.color.name);
          if (data.color.name == "yellow") {
            document.querySelector(
              ".card"
            ).style.background = `linear-gradient(to bottom right, ${data.color.name}, rgb(250, 250, 134), ${data.color.name}, rgb(250, 250, 134), ${data.color.name})`;
          } else if (data.color.name == "red") {
            document.querySelector(
              ".card"
            ).style.background = `linear-gradient(to bottom right, ${data.color.name}, rgb(255, 78, 78), ${data.color.name}, rgb(255, 78, 78), ${data.color.name})`;
          } else if (data.color.name == "blue") {
            document.querySelector(
              ".card"
            ).style.background = `linear-gradient(to bottom right, ${data.color.name}, rgb(70, 70, 255), ${data.color.name}, rgb(70, 70, 255), ${data.color.name})`;
          } else if (data.color.name == "purple") {
            document.querySelector(
              ".card"
            ).style.background = `linear-gradient(to bottom right, ${data.color.name}, rgb(180, 0, 180), ${data.color.name}, rgb(180, 0, 180), ${data.color.name})`;
          } else if (data.color.name == "green") {
            document.querySelector(
              ".card"
            ).style.background = `linear-gradient(to bottom right, ${data.color.name}, rgb(0, 165, 0), ${data.color.name}, rgb(0, 165, 0), ${data.color.name})`;
          } else if (data.color.name == "brown") {
            document.querySelector(
              ".card"
            ).style.background = `linear-gradient(to bottom right, ${data.color.name}, rgb(170, 80, 80), ${data.color.name}, rgb(170, 80, 80), ${data.color.name})`;
          } else if (data.color.name == "white") {
            document.querySelector(
              ".card"
            ).style.background = `linear-gradient(to bottom right, ${data.color.name}, rgb(189, 189, 189), ${data.color.name}, rgb(189, 189, 189), ${data.color.name})`;
          } else if (data.color.name == "pink") {
            document.querySelector(
              ".card"
            ).style.background = `linear-gradient(to bottom right, ${data.color.name}, rgb(255, 154, 169), ${data.color.name}, rgb(255, 154, 169), ${data.color.name})`;
          } else if (data.color.name == "gray") {
            document.querySelector(
              ".card"
            ).style.background = `linear-gradient(to bottom right, ${data.color.name}, rgb(150, 150, 150), ${data.color.name}, rgb(165, 162, 162), ${data.color.name})`;
          }
        });
      let pokemonAbilities = data.abilities;

      let Abilities_div = document.querySelector(".description");
      Abilities_div.innerHTML = ``;

      pokemonAbilities.forEach((abilities) => {
        fetch(abilities.ability.url)
          .then((response) => response.json())
          .then((data) => {
            // Make sure data comes throufg
            // console.log(data.effect_entries);
            let { effect_entries } = data;

            let effectDescription = effect_entries[1].effect;

            let { ability } = abilities;

            // console.log(abilityDetail);
            Abilities_div.innerHTML += `<div class="Ability">
            <p class="Ability-head">${ability.name}</p>
            <p class="Ability-details">${effectDescription}</p>
            </div>`;
          });
      });
    });
}
