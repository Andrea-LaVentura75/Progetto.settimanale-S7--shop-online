const databaseProdotti = "https://striveschool-api.herokuapp.com/api/product/";

const canottaID = new URLSearchParams(location.search).get("canottaID");
console.log(canottaID);

const oggettoCanottaDettagli = function () {
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
      console.log("Canotta Dettagli", canotta);
      stampaCanotta(canotta);
    })
    .catch((error) => {
      console.log("Errore", error);
    });
};
oggettoCanottaDettagli();

const stampaCanotta = function (canotta) {
  let row = document.querySelector(".row");

  let col = document.createElement("div");
  col.classList.add("col", "col-12", "col-md-4", "col-lg-3", "mb-3");
  col.innerHTML = `<div class="card bg-dark text-center" >
      <img src="${canotta.imageUrl}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-light">${canotta.name}</h5>
        <p class="card-text text-light">${canotta.description}</p>
            <p class="card-text text-light">CITY:${canotta.brand}</p>
                <p class="card-text text-light">${canotta.price}$</p>
         <a href="./index.html" class="btn btn-primary">TORNA ALLA HOME</a>
         <a id="btn-elimina" href="#" class="btn btn-danger mt-2">ELIMINA PRODOTTO</a>
         <a id="btn-modifica" href="./backoffice.html?canottaID=${canotta._id}" class="btn btn-warning mt-2">MODIFICA INFO PRODOTTO</a>


      </div>
    </div>`;
  row.appendChild(col);

  let confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  let confirmDeleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));

  let btnElimina = document.getElementById("btn-elimina");
  console.log(btnElimina);
  btnElimina.addEventListener("click", function () {
    confirmDeleteModal.show();
  });

  confirmDeleteBtn.addEventListener("click", function () {
    fetch(databaseProdotti + "/" + canottaID, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NjYwOTc5YzQ1ZjAwMTU2OWI0YzMiLCJpYXQiOjE3Mjc0MjQwMDksImV4cCI6MTcyODYzMzYwOX0.iGgo_WD31yAi32kiWBW0XtRZS2lfUqjcIly_igZ2buo",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          location.assign("./index.html");
          confirmDeleteModal.hide();
        } else {
          throw new Error("La risposta del server non è ok");
        }
      })
      .catch((error) => {
        console.log("Errore", error);
      });
  });
};
