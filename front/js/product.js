let url = new URLSearchParams(window.location.search);
console.log(url);
let id = url.get("id");
console.log(id);

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
    let tableau = [];
    for (let i = 0; i < value.colors.length; i++) {
      let colorsSelected = document.createElement("option");
      colorsSelected.setAttribute("value", value.colors[i]);
      colorsSelected.innerHTML = value.colors[i];
      colorsId.appendChild(colorsSelected);
      console.log(colorsSelected);
    }

    let button = document.querySelector("#addToCart");

    //function pour le localStorage

    //Evènement au click
    button.addEventListener("click", () => {
      //Création de L'objet
      let objet = {
        id: id,
        titre: value.name,
        img: value.imageUrl,
        price: price.innerText,
        color: colorsId.value,
        qty: quantity.value,
      };

      let objetLocal = JSON.parse(localStorage.getItem("panier"));
      console.log(objetLocal);

      function ajoutLocal(objet) {
        if (objet.qty && objet.color) {
          objetLocal.push(objet);
          localStorage.setItem("panier", JSON.stringify(objetLocal));
        } else {
          alert("veuillez Remplir tout les champs");
        }
      }

      function checkLocal(objet) {
        for (let i = 0; i < objetLocal.length; i++) {
          let localId = objetLocal[i].id;
          let localColor = objetLocal[i].color;
          if (localId === objet.id && localColor === objet.color) {
            let localQty = parseInt(objetLocal[i].qty);
            let objetQty = parseInt(objet.qty);
            localQty += objetQty;
            objetLocal.splice(i, 1);
            objetLocal[i].qty = localQty;

            localStorage.setItem("panier", JSON.stringify(objetLocal));
            console.log("oui");
          } else if (
            objetLocal[i].id === objet.id &&
            objetLocal[i].color != objet.color
          ) {
            let localQty = parseInt(objetLocal[i].qty);
            let objetQty = parseInt(objet.qty);
            localQty += objetQty;

            objetLocal[i].qty = localQty;
            localStorage.setItem("panier", JSON.stringify(objetLocal));
          }
        }
      }

      if (objetLocal) {
        ajoutLocal(objet);
      } else {
        objetLocal = [];
        ajoutLocal(objet);
      }

      checkLocal(objet);
      // objet = null;
    });
  })
  .catch(function (err) {
    console.log("une erreur est survenu : " + err);
  });
