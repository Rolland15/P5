let commande = JSON.parse(localStorage.getItem("id"));

console.log(commande.orderId);

let idCommande = document.querySelector("#orderId");

idCommande.innerHTML = commande.orderId;
