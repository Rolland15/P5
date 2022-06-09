let urlId = new URLSearchParams(window.location.search);
console.log(urlId);
let id = urlId.get("order-id");
console.log(id);

let idCommande = document.querySelector("#orderId");

idCommande.innerHTML = id;
