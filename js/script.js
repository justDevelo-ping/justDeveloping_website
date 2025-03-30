// Import les autres fichier JS pour garder cela propre.
import * as cartManagement from "./cart.js";
import * as navModule from "./navigation.js";
import * as formManagement from "./formValidation.js";

// Controlle de l'interface
window.onscroll = function () {
  let scrollPos = document.documentElement.scrollTop;
  navModule.retourEnHaut();
  navModule.navigationFix(scrollPos);
  navModule.menuTransparancy(
    scrollPos,
    document.querySelector(".hero-bg").clientHeight
  );
};

// Mise a jour du Cart et de la liste de produits
cartManagement.productInitialization();
cartManagement.updateCart();
formManagement.formSubmitEventCreation();
