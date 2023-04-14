//--------CHEST MODAL--------//
const chestModal = document.getElementById("chest-modal");
const openChest = document.getElementById("open-chest");
const closeChest = document.getElementById("close-chest");

openChest.onclick = function () {
  chestModal.style.display = "block";
};

closeChest.onclick = function () {
  chestModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == chestModal) {
    chestModal.style.display = "none";
  }
};
//---------------------------//

//-----------CHEST-----------//
const chestItemList = document.getElementById("chest-items");
const storedItems = JSON.parse(localStorage.getItem("itens")) || [];

// Adding items to the chest (cart)
addToChest(storedItems);
function addToChest(localStorageItems) {
  chestItemList.innerHTML = "";
  localStorageItems.forEach((item) => {
    const newItem = document.createElement("div");
    newItem.classList.add("chest-card");
    chestItemList.appendChild(newItem);
    newItem.innerHTML = `<img src="${item.icon}" class="chest-card-img" alt="${item.name}" />  
            <div class="chest-card-text">
              <p>${item.name}</p>
              <div class="chest-card-price">
                <p>${item.price}</p>
                <img src="./img/gold.png" class="card-price-icon">
              </div>
            </div>`;
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("chest-btns");
    buttonElement.innerHTML = `<img src="./img/bin.png" alt="Deletar item">`;
    newItem.appendChild(buttonElement);
    deleteBtn(buttonElement, buttonElement.parentNode, item.id);
  });
  showTotalCost();
}

function showTotalCost() {
  const totalChestCost = document.getElementById("chest-total");
  totalChestCost.innerHTML = "";
  let sum = 0;
  storedItems.forEach((item) => {
    sum += +item.price;
  });
  totalChestCost.innerHTML = `${sum}<img src="./img/gold.png" class="card-price-icon">`;
}

// Getting and adding event listeners to the purchase buttons
function getAddBtns(itemList) {
  const addToChestBtns = document.querySelectorAll("[data-addToChest]");
  addToChestBtns.forEach((element, index) => {
    element.addEventListener("click", () => {
      itemList[index].id = storedItems[storedItems.length - 1] ? storedItems.length : 0;
      storeItemData(itemList[index]);
    });
  });
}

// Pushing their item data to an array and to the LocalStorage
function storeItemData(item) {
  storedItems.push(item);
  localStorage.setItem("itens", JSON.stringify(storedItems));
  addToChest(storedItems);
}

// Deleting items from chest and localStorage
function deleteBtn(button, parent, id) {
  button.addEventListener("click", () => {
    removeFromChest(parent, id);
  });
}

function removeFromChest(tag, id) {
  tag.remove();
  storedItems.splice(
    storedItems.findIndex((elemento) => elemento.id === id),
    1
  );
  localStorage.setItem("itens", JSON.stringify(storedItems));
  showTotalCost();
}
