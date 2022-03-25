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
    // console.log(value);

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

    //boucle pour le choix des couleurs

    for (let i = 0; i < value.colors.length; i++) {
      let colorsSelected = document.createElement("option");
      colorsSelected.setAttribute("value", value.colors[i]);
      colorsSelected.innerHTML = value.colors[i];
      colorsId.appendChild(colorsSelected);
    }

    let button = document.querySelector("#addToCart");

    button.addEventListener("click", () => {
      let objet = {
        id: id,
        price: price,
        couleur: colorsId.value,
        quantite: quantity.value,
      };
      console.log(objet);
      console.log(id);
      console.log(price);
      console.log(colorsId.value);
      console.log(quantity.value);
    });
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

/*let url = new URLSearchParams(window.location.search);

if(url.has('id')){
    let id = url.get("id");
    console.log(id);
}else{
    window.location.pathname = "index.html"
}

function myFunction(parameter){
  let myVariable = parameter + 1;
  return myVariable;
}

var toto = myFunction(10);

fetch(`http://localhost:3000/api/products`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    console.log(window.location);
    for(let i = 0; i < value.length; i++){
     let id  = value[i]._id; 
     console.log(id);
    let imgContainerProduct = document.querySelector(".item__img");
    let imgProduct = document.createElement("img");
    imgContainerProduct.appendChild(imgProduct).setAttribute("src");

    
    

    }
    
  })
  .catch(function(err) {
    // Une erreur est survenue
  });*/
