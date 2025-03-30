// Variables nécéssaire pour lesinteractions a la navigations.
const retourHaut = document.querySelector("#retour-haut");
const btnRetourHaut = document.querySelector("#fleche-haut");
const navFixed = document.querySelector(".navbar-nav");

// Valide si la flèche doit apparaitres et ajout la fonctionnalité s'il est visible.
export function retourEnHaut() {
  if (document.documentElement.scrollTop > 300) {
    retourHaut.classList.remove("opacity-0");

    btnRetourHaut.addEventListener("click", () => {
      document.body.scrollIntoView({ behavior: "smooth" });
    });

    btnRetourHaut.addEventListener("mouseover", () => {
      btnRetourHaut.style.cursor = "pointer";
    });
  } else {
    retourHaut.classList.add("opacity-0");
  }
}

// Modifie la portion de navigation et s'Assure qu'elle suis a mesure que nous consultons la page.
export function navigationFix(ScrollPosition) {
  if (ScrollPosition > 15) {
    navFixed.classList.add("fixed-top", "pt-5");
  } else {
    navFixed.classList.remove("fixed-top", "pt-5");
  }
}

// Valide la position de la navigation pour enlever l'opacité s'il atteind le point ou la lisibilité est reduite.
export function menuTransparancy(scrollPosition, heroSize) {
  const navItem = document.querySelectorAll(".nav-item");
  const paddingAjustement = parseInt(
    getComputedStyle(document.querySelector("header")).paddingTop
  ); // Va chercher la valeur en px du padding du header.
  navItem.forEach((nav) => {
    if (scrollPosition > heroSize - paddingAjustement) {
      // Verifie la position du Scroll versus la longueur du hero - l'ajustement du padding du header.
      nav.classList.remove("bg-opacity-50");
    } else {
      nav.classList.add("bg-opacity-50");
    }
  });
}
