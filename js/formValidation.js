const formulaire = document.querySelector(".needs-validation");

export function formSubmitEventCreation() {
  formulaire.addEventListener("submit", (event) => {
    event.preventDefault();
    if (validateForm()) {
      alert("Votre demande nous a été soumis avec success.");
      formulaire.reset();
      const validRemoval = document.querySelectorAll("input, textarea");
      validRemoval.forEach((element) => {
        element.classList.remove("is-valid");
      });
    }
  });
}

// Fait le tour de tout les elements pour valider s'il corresponds au valide minimum et au bon format.
function validateForm() {
  let isValid = true;

  const name = document.getElementById("nom");
  if (name.value.trim() <= 3) {
    showError(name, "Veuillez entré votre nom.");
    isValid = false;
  } else {
    showSuccess(name);
  }

  const prenom = document.getElementById("prenom");
  if (prenom.value.trim() <= 3) {
    showError(prenom, "Veuillez entré votre prénom.");
    isValid = false;
  } else {
    showSuccess(prenom);
  }

  const email = document.getElementById("email");
  const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,3}$/;
  if (!emailPattern.test(email.value)) {
    showError(email, "Veuillez entré votre courriel.");
    isValid = false;
  } else {
    showSuccess(email);
  }

  const message = document.getElementById("message");
  if (message.value.trim() < 10) {
    showError(message, "Votre message doit avoir un minimum de 10 caractères.");
    isValid = false;
  } else {
    showSuccess(message);
  }
  return isValid;
}

// Insert le message d'erreur et met une couleur rouge pour indiquer que l'entré est invalide.
function showError(input, message) {
  const retour = input.nextElementSibling;
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  retour.textContent = message;
}

// Enleve le message d'erreur et met une couleur verte pour indiquer que l'entré est valide.
function showSuccess(input) {
  const retour = input.nextElementSibling;
  input.classList.add("is-valid");
  input.classList.remove("is-invalid");
  retour.textContent = "";
}
