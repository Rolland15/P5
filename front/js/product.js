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
    function local(objet) {
      let tableau = [];
      tableau.push(objet);
      localStorage.setItem("user", JSON.stringify(tableau));

      console.log(tableau);
      if (tableau.length != null) {
        for (let x = 0; x < tableau.length; x++) {
          if (tableau[x].id === objet.id && tableau[x].color === objet.color) {
            return tableau[x].qty++;
          } else if (
            (tableau[x].id === objet.id && tableau[x].color != objet.color) ||
            tableau[x].id != objet.id
          ) {
            console.log("noveau produit");
          }
         
        }
      }
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

      local(objet);
    });
  })
  .catch(function (err) {
    console.log("une erreur est survenu : " + err);
  });
