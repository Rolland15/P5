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
      } else if (objetPanier.lenght === 0) {
        console.log("fin");
      }

      window.location.reload();
    }
  });
  console.log(typeof objetPanier[0].qty);
  // prix et quantité total

  let qtyPanier = document.querySelector("#totalQuantity");
  let priceTotal = document.querySelector("#totalPrice");

  input.addEventListener("click", () => {
    console.log(objetPanier[a].qty);
    let newQtyProductLs = parseInt(objetPanier[a].qty);
    let newInput = parseInt(input.value);
    newQtyProductLs = newInput;
    objetPanier[a].qty = newQtyProductLs;

    localStorage.setItem("panier", JSON.stringify(objetPanier));

    console.log(newQtyProductLs);
    window.location.reload();
  });
  // PRIX TOTAL
  function calculPrixQty(objetPanier) {
    let total = 0;
    objetPanier.forEach((item) => {
      let prixQty = item.price * item.qty;
      total += prixQty;
    });
    priceTotal.innerHTML = total;
    console.log(total);
  }
  calculPrixQty(objetPanier);

  //QUANTITE TOTAL
  const totalQty = objetPanier.reduce((total, item) => {
    return total + parseInt(item.qty);
  }, 0);
  console.log(totalQty);

  qtyPanier.innerHTML = totalQty;
}

/*Validation Du Formulaire*/
let myForm = document.querySelector(".cart__order__form");
let button = document.querySelector("#order");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");
let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let cityErrorMsg = document.querySelector("#cityErrorMsg");
let emailErrorMsg = document.querySelector("#emailErrorMsg");
//objet utilisateur
let contact = {
  firstName: firstName.value,
  lastName: lastName.value,
  address: address.value,
  city: city.value,
  email: email.value,
};
//Evènement

firstName.addEventListener("change", () => {
  validFirstName(this);
});
lastName.addEventListener("change", () => {
  validLastName(this);
});
address.addEventListener("change", () => {
  validaddress(this);
});
city.addEventListener("change", () => {
  validCityName(this);
});
email.addEventListener("change", () => {
  validEmail(this);
});

//function Contrôle Formulaire

const validFirstName = (input) => {
  let regex = /^[a-zA-Z-]+$/;

  let testName = regex.test(firstName.value);

  if (testName) {
    console.log("ok");
    contact.firstName = firstName.value;
    firstNameErrorMsg.innerHTML = "";
  } else {
    console.log("ouai");
    firstNameErrorMsg.innerHTML = "invalid";
  }
};

const validLastName = (input) => {
  let regex = /^[a-zA-Z-]+$/;

  let testName = regex.test(lastName.value);
  console.log(testName);

  if (testName) {
    console.log("ok");
    contact.lastName = lastName.value;
    lastNameErrorMsg.innerHTML = "";
  } else {
    console.log("ouai");
    lastNameErrorMsg.innerHTML = "invalid";
  }
};
const validaddress = (input) => {
  let regex = /^[a-zA-Z0-9 À-ú]+$/;

  let testAddress = regex.test(address.value);
  console.log(testAddress);

  if (testAddress) {
    console.log("ok");
    contact.address = address.value;
    addressErrorMsg.innerHTML = "";
  } else {
    console.log("ouai");
    addressErrorMsg.innerHTML = "invalid";
  }
};

const validCityName = (input) => {
  let regex = /^[a-zA-Z- ]+$/;

  let testName = regex.test(city.value);
  console.log(testName);

  if (testName) {
    console.log("ok");
    contact.city = city.value;
    cityErrorMsg.innerHTML = "";
  } else {
    console.log("ouai");
    cityErrorMsg.innerHTML = "invalid";
  }
};

const validEmail = (input) => {
  let regex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

  let test = regex.test(email.value);
  console.log(test);

  if (test) {
    console.log("ok");
    contact.email = email.value;
    emailErrorMsg.innerHTML = "";
  } else {
    emailErrorMsg.innerHTML = "invalid";
  }
};

// POST

button.addEventListener("click", (e) => {
  e.preventDefault();
  let products = [];
  for (let a = 0; a < objetPanier.length; a++) {
    let idProducts = objetPanier[a].id;
    console.log(idProducts);
    products.push(idProducts);
    console.log(products);

    let touteInfo = {
      contact,
      products,
    };

    console.log(typeof touteInfo);
    const commandeOne = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(touteInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    commandeOne.then(async (response) => {
      try {
        console.log(response);
        let retour = await response.json();
        console.log(retour);

        window.location = `confirmation.html?order-id=${retour.orderId}`;
      } catch (e) {
        console.log(e);
      }
    });

    console.log(commandeOne);
  }

  // window.location = "confirmation.html";
});
