let objetPanier = JSON.parse(localStorage.getItem("panier"));
console.log(objetPanier);

//console.log(productPanier[0]);

//console.log(productPanier);
let cardItems = document.querySelector("#cart__items");

for (let a = 0; a < objetPanier.length; a++) {
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
  input.textContent = objetPanier.qty;
  contentSettingQuantity.appendChild(paragrapheQuantity);
  contentSettingQuantity.appendChild(input);
  contentDelete.appendChild(paragrapheDelete);
  contentSetting.appendChild(contentSettingQuantity);
  contentSetting.appendChild(contentDelete);
  panierArticle.appendChild(divImgPanier);
  panierArticle.appendChild(cartItemContent);
  panierArticle.appendChild(contentSetting);

  divImgPanier.appendChild(imgPanier).setAttribute("src", objetPanier[a].img);
  input.setAttribute("value", objetPanier[a].qty);
  titreDescription.innerHTML = objetPanier[a].titre;
  paragrapheDescription.innerHTML = objetPanier[a].color;
  paragrapheDescription2.innerHTML = objetPanier[a].price;

  cardItems.appendChild(panierArticle);
  // console.log(paragrapheDelete);
  //console.log(productPanier);

  paragrapheDelete.addEventListener("click", () => {
    cardItems.removeChild(panierArticle);
    //console.log("delete");

    /*delete objetPanier[a];
    console.log(objetPanier);
    localStorage.setItem("panier", JSON.stringify(objetPanier));
*/ for (var i = 0; i < objetPanier.length; i++) {
      if (
        objetPanier[i].id === objetPanier[a].id &&
        objetPanier[i].color === objetPanier[a].color
      ) {
        objetPanier.splice(i, 1);
        localStorage.setItem("panier", JSON.stringify(objetPanier));
        console.log(objetPanier);
      }
    }
    //return true;

    //localStorage.removeItem("panier");
    //localStorage.setItem("panier", JSON.stringify(objetPanier));
  });
}

// prix et quantité total

let qtyPanier = document.querySelector("#totalQuantity");
let priceTotal = document.querySelector("#totalPrice");

const total = objetPanier.reduce((total, panier) => {
  return total + panier.price;
}, 0);
console.log(total);
