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
    let produitStocker = [];
    // function pour le localStorage
    function Panier(objet) {
      // console.log(produitStocker);
      if (objet.qty >= 1 && objet.color) {
        localStorage.setItem("userProduct", produitStocker);
        produitStocker.push(JSON.stringify(objet));
        // console.log(produitStocker);
      } else {
        console.log("ok");
      }
      test(objet);
    }

    function test(objet) {
      let local = localStorage.getItem("userProduct");
      let ro = local.includes(objet.id);
      console.log("objet " + typeof objet.id);
      console.log("produitStocker " + typeof local[0].id);
      console.log("ro " + ro);
      if (ro != undefined) {
        parseInt(objet.qty);
        produitStocker.splice(ro, objet.qty);
        produitStocker.push(JSON.stringify(objet));
        // console.log(produitStocker);
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
      console.log(produitStocker);
      Panier(objet);

      // samePanier(objet);
    });
  })
  .catch(function (err) {
    console.log("une erreur est survenu : " + err);
  });
