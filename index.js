const databaseProdotti = "https://striveschool-api.herokuapp.com/api/product/";

const arrayProdotti = function () {
  fetch(databaseProdotti, {
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
    .then((canotte) => {
      console.log("ECCO LE CANOTTE", canotte);
      creazioneCardShop(canotte);
    })
    .catch((error) => {
      console.log(error);
    });
};
arrayProdotti();

const creazioneCardShop = function (canotte) {
  let row = document.querySelector(".row");
  canotte.forEach((canotta) => {
    let col = document.createElement("div");
    col.classList.add("col", "col-12", "col-md-4", "col-lg-3");
    col.innerHTML = `<div class="card bg-dark text-center" >
  <img src="${canotta.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title text-light">${canotta.name}</h5>
    <p class="card-text text-light">${canotta.description}</p>
        <p class="card-text text-light">CITY:${canotta.brand}</p>
            <p class="card-text text-light">${canotta.price}$</p>
     <a href="./details.html?canottaID=${canotta._id}" class="btn btn-primary">VAI AI DETTAGLI</a>
  </div>
</div>`;
    row.appendChild(col);
  });
};
