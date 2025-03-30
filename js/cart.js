// Variable relié au Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const totalContainer = document.getElementById("total");
const clearCartButton = document.getElementById("clear-cart");

// Gestion de l'affichage du Modal de details lorsque le boutton Voir details est cliqué
export function showProductModal(id, title, prix, desc, img) {
  const modalTitle = document.getElementById("detailModalTitle");
  const modalBody = document.getElementById("detailModalBody");
  modalTitle.textContent = title;
  modalBody.innerHTML = `
    <div class="row">
      <div class="col-4">
        <img src="${img}" alt="${title}" class="img-fluid"/>
      </div>
      <div class="col-8">
        <p class="card-center">Prix: ${prix}</p>
        <p class="card-center">Description: ${desc}</p>
      </div>
    </div>`;

  const myModal = new bootstrap.Modal(document.getElementById("viewModal"));

  myModal.show();
}

// Effectue une mise a jour du panier et du localStorage
export function updateCart() {
  cartContainer.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  cart.forEach((item) => {
    total += item.prix * item.quantity;
    itemCount += item.quantity;

    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-item-center"
    );
    listItem.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.img}" alt="Poster thumbnail" height="48px"/>
        <span class="ps-2">${item.title}</span>
      </div>
      <div class="d-flex flex-row align-items-center justify-content-between w-50 ps-5">
        <span class="w-100 ps-4">
          Qte: ${item.quantity}
        </span>
        <span class="pe-3">
          Total:${(item.prix * item.quantity).toFixed(2)}$
        </span>
        <button 
          class="btn btn-danger remove-item d-flex align-items-center justify-content-center"
          data-id="${item.id}"
          height="24px"
          width="24px">
          <img src="assets/svg/trash.svg" alt="delete" height="18px"/>
        </button>       
      </div>
    `;

    cartContainer.appendChild(listItem);
  });
  const cartSpan = document.querySelectorAll(".cart-count");
  cartSpan.forEach((count) => {
    count.textContent = itemCount;
    if (itemCount > 0) {
      count.classList.remove("opacity-0");
    } else if (itemCount <= 0 || itemCount == null) {
      count.classList.add("opacity-0");
    }
  });

  totalContainer.textContent = total.toFixed(2);

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.closest("button").getAttribute("data-id");
      removeFromCart(id);
    });
  });
  displayClearCartButton();
}

// Ajoute un produit au panier.
export function addToCart(id, title, prix, img) {
  const existingCartItem = cart.find((item) => item.id === id);
  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cart.push({ id, title, prix, img, quantity: 1 });
  }

  updateCart();
  saveCart();
}

// Retire un des produits du panier.
export function removeFromCart(id) {
  const index = cart.findIndex((item) => item.id === id);

  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
  }

  updateCart();
  saveCart();
}

// Sauvegarde l'état du Panier dans le localStorage
export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Vide le Panier et le localStorage
export function clearCart() {
  cart = [];
  saveCart();
  updateCart();
}

// Affiche le boutton pour vider le pannier si des objets sont ans le panier.
export function displayClearCartButton() {
  if (cart.length > 0) {
    clearCartButton.style.display = "block";
  } else {
    clearCartButton.style.display = "none";
  }
}

// Fonction de boutton qui valider si l'tilisateur veut vraiment retirer tout les objet du panier.
clearCartButton.addEventListener("click", () => {
  if (confirm("Êtes-cous sûr de vouloir vider le panier?")) {
    clearCart();
  }
});

// Gestion de l'initialisation du panier lorsque la page est loader, en validant le localStorage pour remplir le modal du panier.
export function productInitialization() {
  fetch("assets/products-list.json")
    .then((response) => response.json())
    .then((products) => {
      products.forEach((element) => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-12", "col-lg-6");
        productCard.innerHTML = `
          <div class="card mb-4 shadow">
            <div class="row g-0">
              <div class="col-4">
                <img
                  src="${element.image_link}"
                  alt="${element.title}"
                  class="img-fluid rounded-start-1" />
              </div>
              <div class="col-8">
                <div class="card-body h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text">${element.price} $</p>
                  </div>
                  <div class="w-100">
                    <button
                      data-id="${element.id}"
                      data-nom="${element.title}"
                      data-prix="${element.price}"
                      data-img="${element.image_link}"
                      data-desc="${element.description}"
                      class="btn btn-primary view-detail w-auto">
                      Voir détails
                    </button>
                    <button
                      data-id="${element.id}"
                      data-nom="${element.title}"
                      data-prix="${element.price}"
                      data-img="${element.image_link}"
                      data-desc="${element.description}"
                      class="btn btn-primary add-to-cart w-auto">
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        productsContainer.appendChild(productCard);
      });

      document.querySelectorAll(".view-detail").forEach((button) => {
        button.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          const title = e.target.getAttribute("data-nom");
          const prix = e.target.getAttribute("data-prix");
          const desc = e.target.getAttribute("data-desc");
          const img = e.target.getAttribute("data-img");

          showProductModal(id, title, prix, desc, img);
        });
      });

      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          const title = e.target.getAttribute("data-nom");
          const prix = e.target.getAttribute("data-prix");
          const img = e.target.getAttribute("data-img");

          addToCart(id, title, prix, img);
        });
      });
    });
}
