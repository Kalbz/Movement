import { layoutTemplates } from "./layoutTemplate.js";
import { createNavbar } from "../components/navbar.js";
import { createHero } from "../components/hero.js";
import { createCarousel } from "../components/carousel.js";
import { createAvatar } from "../components/avatar.js";
import { createFooter } from "../components/footer.js";
import { createBoxes } from "../components/boxes.js";
import { createCard } from "../components/card.js";
import { createAccordion } from "../components/accordion.js";
import { createDiff } from "../components/diff.js";
import { createDivider } from "../components/divider.js";

export function renderRandomLayout() {
  const app = document.getElementById("app");
  app.innerHTML = "";

    const layout = layoutTemplates[Math.floor(Math.random() * layoutTemplates.length)];

    if (!layout || !Array.isArray(layout)) {
    console.warn("Invalid layout:", layout);
    return;
    }


console.log("layoutTemplates:", layoutTemplates);
console.log("Selected layout:", layout);


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
        break;
      case "Accordion":
        element = createAccordion();
        break;
      case "Comparison":
        element = createDiff();
        break;
      case "Divider":
        const cardA = createCard();
        const cardB = createCard();

        element = createDivider(cardA, cardB, {
          vertical: true,
          alignment: "center",
        });
      default:
        console.warn(`Unknown section: ${section}`);
    }

    if (element) app.appendChild(element);
  });
}
