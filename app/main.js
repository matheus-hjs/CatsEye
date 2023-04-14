let itens = [];
const catsEyeAPI = "https://matheus-hjs.github.io/CatsEyeAPI/items.json";

//--FETCHING AND DISPLAYING ITEMS--//
fetchItems();

async function fetchItems() {
  const res = await fetch(catsEyeAPI);
  itens = await res.json();
  displayItems(itens);
  setTimeout(getAddBtns(itens), 1000);
}

const shopList = document.getElementById("items");

function displayItems(listaDeItens) {
  shopList.innerHTML = "";
  listaDeItens.forEach((item) => {
    damageType(item.category);
    shopList.innerHTML += `
    <div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
        <img src="${item.icon}" class="card-img" alt="${item.name}" />       
        <div class="card-text-front">
        <p>${item.name}</p>
        <div class="card-damage">
          <img src="./img/weapon-${damageType(item.category)}" class="card-damage-type">
          <p>${item.attack}</p>
        </div>
        </div>       
        </div>
        <div class="flip-card-back">
            <p class="card-text-back">${item.description}</p>
            <div class="card-price">
            <button class="btn-purchase" data-addToChest>
              <p class="title">${item.price}</p>
              <img src="./img/gold.png" class="card-damage-type">
            </button>           
          </div>
        </div>
    </div>
</div>`;
  });
}

function damageType(weapon) {
  switch (weapon) {
    case "sword":
      return "sword.png";
    case "bow":
      return "bow.png";
    case "staff":
      return "staff.png";
    case "spell":
      return "spell.png";
  }
}
