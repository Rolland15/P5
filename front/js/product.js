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
    let produitStocker = [];

    function test2(local) {
      let localGet = JSON.parse(local);
      console.log(localGet);
      produitStocker.push(localGet);

      console.log(produitStocker);
      if (produitStocker.length != null) {
        console.log("ok2");
        //test(objet);
      }
    }

    function Panier(objet) {
      let tableau = produitStocker.push(JSON.stringify(objet));
      // let local = localStorage.getItem("userProduct");

      if (tableau > 1) {
        console.log("ouai");
        let localGet = JSON.parse(localStorage.getItem("userProduct"));
        let productQty = parseInt(localGet.qty);
        console.log(localGet);
        console.log(typeof productQty);
      } else if (objet.qty && objet.color) {
        localStorage.setItem("userProduct", produitStocker);

        //let localGet = JSON.parse(local);
        //let localQty = parseInt(localGet.qty);
        console.log(tableau);
        // console.log(typeof localGet.qty);
        // console.log(typeof localQty);
        //console.log(local);
      } else {
        console.log("ok");
      }
    }

    function test(objet) {
      let localGet = localStorage.getItem("userProduct");
      let ro = localGet.includes(objet.id);
      // console.log("objet " + objet["id"]);
      //console.log(localGet["userProduct"].id);
      console.log("ro " + ro);
      if (ro != undefined) {
        let qty = parseInt(objet.qty);
        objet.qty = qty += 1;

        console.log(objet.qty);
      } else {
        produitStocker.push(JSON.stringify(objet));
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

      Panier(objet);
    });
  })
  .catch(function (err) {
    console.log("une erreur est survenu : " + err);
  });
