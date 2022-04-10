let objetPanier = localStorage.getItem("userProduct");
let productPanier = [];
productPanier.push(JSON.stringify(objetPanier));

console.log(productPanier);

//Creation d'élement
let cardItems = document.querySelector("#cart__items");
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
contentSettingQuantity.classList.add("cart__item__content__settings__quantity");
input.classList.add("itemQuantity");
contentDelete.classList.add("cart__item__content__setting__delete");
paragrapheDelete.classList.add("deleteItem");

//innerHTML
paragrapheQuantity.textContent = `Qté :`;

//appendChild et SetAttribute
divImgPanier.appendChild(imgPanier).setAttribute("src", productPanier[0].img);
cartItemContent.appendChild(cartItemContentDescription);
cartItemContentDescription.appendChild(titreDescription);
cartItemContentDescription.appendChild(paragrapheDescription);
cartItemContentDescription.appendChild(paragrapheDescription2);
input.setAttribute(
  "type",
  "number",
  "name",
  "itemQuantity",
  "min",
  "1",
  "max",
  "100",
  "value",
  "42"
);
contentSettingQuantity.appendChild(paragrapheQuantity);
contentSettingQuantity.appendChild(input);
contentDelete.appendChild(paragrapheDelete);
contentSetting.appendChild(contentSettingQuantity);
contentSetting.appendChild(contentDelete);
panierArticle.appendChild(divImgPanier);
panierArticle.appendChild(cartItemContent);
panierArticle.appendChild(contentSetting);

console.log(panierArticle);

cardItems.appendChild(panierArticle);
