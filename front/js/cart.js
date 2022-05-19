let objetPanier = localStorage.getItem("panier");
console.log(typeof objetPanier);

let productPanier = [];
productPanier.push(JSON.parse(objetPanier));
console.log(productPanier[0]);

console.log(productPanier);
let cardItems = document.querySelector("#cart__items");

for (let a = 0; a < productPanier[0].length; a++) {
  //selection  d'élement

  let panierArticle = document.createElement("article");
  let divImgPanier = document.createElement("div");
  let imgPanier = document.createElement("img");
  let cartItemContent = document.createElement("div");
  let cartItemContentDescription = document.createElement("div");
  let titreDescription = document.createElement("h2");
  let paragrapheDescription = document.createElement("p");
  let paragrapheDescription2 = document.createElement("p");
  let paragrapheDelete = document.createElement("p");
  let paragrapheQuantity = document.createElement("p");
  let contentSetting = document.createElement("div");
  let contentSettingQuantity = document.createElement("div");
  let input = document.createElement("input");
  let contentDelete = document.createElement("div");
  //ClassList
  contentSetting.classList.add("cart__item__content__settings");
  panierArticle.classList.add("cart__item");
  divImgPanier.classList.add("cart__item__img");
  cartItemContent.classList.add("cart__item__content");
  cartItemContentDescription.classList.add("cart__item__content__description");
  contentSettingQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  input.classList.add("itemQuantity");
  contentDelete.classList.add("cart__item__content__settings__delete");
  paragrapheDelete.classList.add("deleteItem");

  //innerHTML
  paragrapheQuantity.textContent = `Qté :`;

  paragrapheDelete.textContent = "Supprimer";

  //appendChild et SetAttribute
  //divImgPanier.appendChild(imgPanier).setAttribute("src", productPanier[0].img);
  cartItemContent.appendChild(cartItemContentDescription);
  cartItemContentDescription.appendChild(titreDescription);
  cartItemContentDescription.appendChild(paragrapheDescription);
  cartItemContentDescription.appendChild(paragrapheDescription2);
  input.setAttribute("type", "number");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  //input.setAttribute("value", productPanier[0].qty);
  input.textContent = productPanier[0].qty;
  contentSettingQuantity.appendChild(paragrapheQuantity);
  contentSettingQuantity.appendChild(input);
  contentDelete.appendChild(paragrapheDelete);
  contentSetting.appendChild(contentSettingQuantity);
  contentSetting.appendChild(contentDelete);
  panierArticle.appendChild(divImgPanier);
  panierArticle.appendChild(cartItemContent);
  panierArticle.appendChild(contentSetting);

  divImgPanier
    .appendChild(imgPanier)
    .setAttribute("src", productPanier[0][a].img);
  input.setAttribute("value", productPanier[0][a].qty);
  titreDescription.innerHTML = productPanier[0][a].titre;
  paragrapheDescription.innerHTML = productPanier[0][a].color;
  paragrapheDescription2.innerHTML = productPanier[0][a].price;
  console.log(productPanier[0][a]);
  cardItems.appendChild(panierArticle);
  console.log(paragrapheDelete);
  console.log(productPanier);

  paragrapheDelete.addEventListener("click", () => {
    cardItems.removeChild(panierArticle);
    console.log("delete");
    console.log(productPanier[0][a]);

    let tableauFiltrer = productPanier.filter((el) => {
      return el.id !== productPanier[0][a].id;
    });
    console.log(tableauFiltrer);
  });
}
// prix et quantité total

let qtyPanier = document.querySelector("#totalQuantity");
let priceTotal = document.querySelector("#totalPrice");
let paragrapheDelete = document.createElement("p");
