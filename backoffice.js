const databaseProdotti = "https://striveschool-api.herokuapp.com/api/product/";

const canottaID = new URLSearchParams(location.search).get("canottaID");

if (canottaID) {
  fetch(databaseProdotti + "/" + canottaID, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NjYwOTc5YzQ1ZjAwMTU2OWI0YzMiLCJpYXQiOjE3Mjc0MjQwMDksImV4cCI6MTcyODYzMzYwOX0.iGgo_WD31yAi32kiWBW0XtRZS2lfUqjcIly_igZ2buo",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La risposta del server non è ok");
      }
    })
    .then((canotta) => {
      let name = document.getElementById("name-team");
      let description = document.getElementById("descrizione");
      let brand = document.getElementById("city");
      let imageUrl = document.getElementById("img");
      let price = document.getElementById("prezzo");

      name.value = canotta.name;
      description.value = canotta.description;
      brand.value = canotta.brand;
      imageUrl.value = canotta.imageUrl;
      price.value = canotta.price;

      let btnModifica = document.querySelector(".btn-outline-primary");
      btnModifica.innerText = "SALVA MODIFICHE";
    })
    .catch((error) => {
      console.log("Errore", error);
    });
}

let form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let name = document.getElementById("name-team").value;
  let description = document.getElementById("descrizione").value;
  let brand = document.getElementById("city").value;
  let imageUrl = document.getElementById("img").value;
  let price = parseFloat(document.getElementById("prezzo").value);

  class CreazioneCanotta {
    constructor(_name, _description, _brand, _imageUrl, _price) {
      this.name = _name;
      this.description = _description;
      this.brand = _brand;
      this.imageUrl = _imageUrl;
      this.price = _price;
    }
  }

  let Canotta = new CreazioneCanotta(name, description, brand, imageUrl, price);
  console.log(Canotta);

  let indirizzo;
  if (canottaID) {
    indirizzo = databaseProdotti + "/" + canottaID;
  } else {
    indirizzo = databaseProdotti;
  }

  fetch(indirizzo, {
    method: canottaID ? "PUT" : "POST",
    body: JSON.stringify(Canotta),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NjYwOTc5YzQ1ZjAwMTU2OWI0YzMiLCJpYXQiOjE3Mjc0MjQwMDksImV4cCI6MTcyODYzMzYwOX0.iGgo_WD31yAi32kiWBW0XtRZS2lfUqjcIly_igZ2buo",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);

      if (response.ok) {
        alert(canottaID ? "Prodotto modificato" : "Prodotto salvato!");
        location.assign("./index.html");
      } else {
        throw new Error("La risposta del server non è ok");
      }
    })
    .catch((error) => {
      console.log("ERRORE", error);
    });
});

let resetbtn = document.querySelector(".reset");

resetbtn.addEventListener("click", function () {
  form.reset();
});
