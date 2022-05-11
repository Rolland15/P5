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

    let button = document.querySelector("#addToCart");

    //function pour le localStorage
    let tableau = [];
    function createLocal(objet) {
      if (objet.color && objet.qty > 0) {
        tableau.push(objet);
        localStorage.setItem("panier", JSON.stringify(tableau));
      } else {
        alert("veuillez remplir tout les champs");
      }
    }
    function localControle(objet) {
      let recuperationLocal = JSON.parse(localStorage.getItem("panier"));
      if (recuperationLocal === null) {
        createLocal(objet);
      } else if (recuperationLocal != null) {
        for (let y = 0; y < recuperationLocal.length; y++) {
          if (
            recuperationLocal[y].id === objet.id &&
            recuperationLocal[y].color === objet.color
          ) {
            console.log(recuperationLocal[y].id);
            console.log(recuperationLocal[y].color);
            let objetQty = parseInt(objet.qty);
            let localQty = parseInt(recuperationLocal[y].qty);
            let result = objetQty + localQty;
            recuperationLocal[y].qty = result;
            console.log(result);
            localStorage.setItem("panier", JSON.stringify(recuperationLocal));
          } else {
            createLocal(objet);
          }
        }
      }
      console.log(recuperationLocal);
    }
    //Evènement au click
    button.addEventListener("click", () => {
      //Création de L'objet
      let objet = {
        id: id,
        titre: value.name,
        img: value.imageUrl,
        price: price.innerText * quantity.value + "€",
        color: colorsId.value,
        qty: quantity.value,
      };
      localControle(objet);
    });
  })
  .catch(function (err) {
    console.log("une erreur est survenu : " + err);
  });
