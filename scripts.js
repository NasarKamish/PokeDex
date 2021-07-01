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
  <div class="pokemon-name">
    <p></p>
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
      <img class="image" src="${data.sprites.other.dream_world.front_default} ">
      `;
      let pokemonAbilities = data.abilities;

      let Abilities_div = document.querySelector(".description");
      Abilities_div.innerHTML = ``;

      abilityName = [];
      abilityDetail = [];

      pokemonAbilities.forEach((abilities) => {
        fetch(abilities.ability.url)
          .then((response) => response.json())
          .then((data) => {
            let p = 0;
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
      colorPicker(data.species.url);
    });
}

function colorPicker(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Make sure data comes throufg
      // console.log(data.color.name);
      if (data.color.name !== "white") {
        document.querySelector(
          ".card"
        ).style.background = `linear-gradient(to bottom right, ${data.color.name}, white, ${data.color.name}, white, ${data.color.name})`;
      } else {
        document.querySelector(
          ".card"
        ).style.background = `linear-gradient(to bottom right, ${data.color.name}, grey, ${data.color.name}, grey, ${data.color.name})`;
      }
    });
}
