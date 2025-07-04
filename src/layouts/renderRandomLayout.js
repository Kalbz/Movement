import { layoutTemplates } from "./layoutTemplate.js";
import { createNavbar } from "../components/navbar.js";
import { createHero } from "../components/hero.js";
import { createCarousel } from "../components/carousel.js";
import { createAvatar } from "../components/avatar.js";
import { createFooter } from "../components/footer.js";
import { createBoxes } from "../components/boxes.js";
import { createCard } from "../components/card.js";

export function renderRandomLayout() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const layout = layoutTemplates[Math.floor(Math.random() * layoutTemplates.length)];

  layout.forEach((section) => {
    let element;

    switch (section) {
      case "Navbar":
        element = createNavbar();
        break;
      case "Hero":
        element = createHero();
        break;
      case "Carousel":
        element = createCarousel();
        break;
      case "Avatar":
        element = createAvatar();
        break;
      case "Boxes":
        element = createBoxes();
        break;
      case "Footer":
        element = createFooter();
        break;
      case "Card":
        element = createCard();
      default:
        console.warn(`Unknown section: ${section}`);
    }

    if (element) app.appendChild(element);
  });
}
