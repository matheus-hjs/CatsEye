// Filtering by category
const buttons = document.querySelectorAll(".btn-filter");

buttons.forEach((button) => button.addEventListener("click", filterItems));

function filterItems() {
  const btnElement = document.getElementById(this.id);
  const category = btnElement.value;
  let filteredItems = filterByType(category);
  displayItems(filteredItems);
  setTimeout(getAddBtns(filteredItems), 1000);
}

function filterByType(type) {
  return itens.filter((item) => item.category == type);
}

//Searchbar
const searchButton = document.getElementById("btn-search");
searchButton.addEventListener("click", () => {
  searchItem();
});
const searchBar = document.getElementById("search");
function searchItem() {
  const searchTerms = searchBar.value;
  let searchedItems = filterBySearch(searchTerms);
  displayItems(searchedItems);
}

function filterBySearch(search) {
  return itens.filter((item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
}
