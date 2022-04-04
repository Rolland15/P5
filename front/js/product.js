let url = new URLSearchParams(window.location.search);
//console.log(url);
let id = url.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    //console.log(value);

    //DOM afficher le produits et ses détails
    let imgContainerProduct = document.querySelector(".item__img");
    let imgProduct = document.createElement("img");
    imgContainerProduct
      .appendChild(imgProduct)
      .setAttribute("src", value.imageUrl);
    let productName = document.querySelector("#title");
    productName.innerHTML = value.name;
    let price = document.querySelector("#price");
    price.innerHTML = value.price;
    let description = document.querySelector("#description");
    description.innerHTML = value.description;
    let quantity = document.querySelector("#quantity");
    let colorsId = document.querySelector("#colors");

    //boucle for pour le choix des couleurs

    for (let i = 0; i < value.colors.length; i++) {
      let colorsSelected = document.createElement("option");
      colorsSelected.setAttribute("value", value.colors[i]);
      colorsSelected.innerHTML = value.colors[i];
      colorsId.appendChild(colorsSelected);
    }
    // evenement click pour implémenter les valeurs du produit dans mon objet
    let button = document.querySelector("#addToCart");

    let produitStocker = [];

    // function pour le localStorage
    function ajoutPanier(objet) {
      if (objet.quantite >= 1 && objet.couleur) {
        produitStocker.push(JSON.stringify(objet));
        localStorage.setItem("userProduct", produitStocker);
        console.log(produitStocker);
      } else if (produitStocker.length > 0) {
        localStorage.getItem("userProduct");
        produitStocker.push(JSON.parse(objet));
        console.log(produitStocker);
      } else {
        alert("sélectionner tout les détails de la commande");
      }
    }
    let sameProduct = produitStocker.find((p) => p.id == objet.id);
    console.log(sameProduct);

    function memeProduits(sameProduct) {
      if (sameProduct != undefined) {
        console.log("ça marche");
      } else {
        console.log("ça ne marche pas");
      }
    }

    button.addEventListener("click", () => {
      //Création de L'objet

      let objet = {
        id: id,
        img: imgProduct,
        price: price.innerText * quantity.value + "€",
        couleur: colorsId.value,
        quantite: quantity.value,
      };
      /* console.log(objet);
      console.log(id);
      console.log(price.innerText);
      console.log(colorsId.value);
      console.log(quantity.value);
      */
      memeProduits(sameProduct);
      ajoutPanier(objet);
    });
  })
  .catch(function (err) {
    console.log("une erreur est survenu : " + err);
  });
