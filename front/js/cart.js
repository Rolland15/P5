let objetPanier = JSON.parse(localStorage.getItem("panier"));
console.log(objetPanier);

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

  cartItemContent.appendChild(cartItemContentDescription);
  cartItemContentDescription.appendChild(titreDescription);
  cartItemContentDescription.appendChild(paragrapheDescription);
  cartItemContentDescription.appendChild(paragrapheDescription2);
  input.setAttribute("type", "number");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");

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
  paragrapheDescription2.innerHTML = objetPanier[a].price + " €";

  cardItems.appendChild(panierArticle);

  paragrapheDelete.addEventListener("click", () => {
    cardItems.removeChild(panierArticle);
    for (var i = 0; i < objetPanier.length; i++) {
      if (
        objetPanier[i].id === objetPanier[a].id &&
        objetPanier[i].color === objetPanier[a].color
      ) {
        objetPanier.splice(i, 1);
        localStorage.setItem("panier", JSON.stringify(objetPanier));
        console.log(objetPanier);
      }

      window.location.reload();
    }
  });
  // prix et quantité total

  let qtyPanier = document.querySelector("#totalQuantity");
  let priceTotal = document.querySelector("#totalPrice");
  let tab = [];
  input.addEventListener("click", () => {
    console.log(objetPanier[a].price);

    objetPanier[a].qty = input.value;
    for (let i = 0; i < objetPanier.lenght; i++) {
      let objPrice = parseInt(objetPanier[i].price);
      console.log(objPrices[i]);

      let inputValue = parseInt(input.value);
      let newPrice = objPrice * inputValue;
      tab.push(newPrice);
    }

    localStorage.setItem("total", JSON.stringify(tab));
    console.log(objetPanier[a].price);
    console.log(input.value);
    console.log(tab);
    // PRIX TOTAL
    const totalPrice = tab.reduce((total, item) => {
      return total + parseInt(item);
    }, 0);
    console.log(totalPrice);
    priceTotal.innerHTML = totalPrice;
    //window.location.reload();
  });

  //QUANTITE TOTAL
  const totalQty = objetPanier.reduce((total, item) => {
    return total + parseInt(item.qty);
  }, 0);
  console.log(totalQty);

  qtyPanier.innerHTML = totalQty;
}

/*Validation Du Formulaire*/
let button = document.querySelector("#order");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");
button.addEventListener("click", (e) => {
  e.preventDefault();

  //creation de l'objet utilisateur
  let utilisateurForm = {
    prenom: firstName.value,
    nom: lastName.value,
    adresse: address.value,
    city: city.value,
    email: email.value,
  };

  console.log(utilisateurForm);
});
