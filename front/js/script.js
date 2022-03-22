let test = "test";

fetch(`http://localhost:3000/api/products`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value);

    for (let i = 0; i < value.length; i++) {
      let link = document.createElement("a");
      let items = document.querySelector("#items");
      let article = document.createElement("article");
      let img = document.createElement("img");
      let titre = document.createElement("h3");
      let paragraphe = document.createElement("p");

      items
        .appendChild(link)
        .setAttribute("href", `./product.html?id=` + value[i]._id);
      link.appendChild(article);
      article.appendChild(img).setAttribute("src", value[i].imageUrl);
      article.appendChild(titre).innerHTML = value[i].name;
      article.appendChild(paragraphe).innerHTML = value[i].description;
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
