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
import { createTable } from "../components/table.js";
import { wrapWithLayout } from "./layoutWrapper.js";
import { createText } from "../components/text.js";
import { createLongText } from "../components/longText.js";
import { createSpacer } from "../components/spacer.js";

function createComponentFromName(name, layout = {}, props = {}) {
  switch (name) {
    case "Navbar": return createNavbar();
    case "Hero": return createHero();
    case "Carousel": return createCarousel();
    case "Avatar": return createAvatar();
    case "Boxes": return createBoxes();
    case "Footer": return createFooter();
    case "Card": return createCard();
    case "Accordion": return createAccordion();
    case "Table": return createTable();
    case "Comparison": return createDiff();
    case "Text":
      return createText(props);

    case "LongText": return createLongText();
    case "Spacer": {
      const direction = layout.direction || "vertical";
      const size = layout.size || "0";
      const background = layout.background || "";
      const grow = layout.grow !== false;

      return createSpacer({ direction, size, background, grow });
    }
    case "Divider": {
      const cardA = createCard();
      const cardB = createCard();
      return createDivider(cardA, cardB, { vertical: true });
    }
    default:
      console.warn(`Unknown component type: ${name}`);
      return null;
  }
}



export function renderRandomLayout() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const layout = layoutTemplates[Math.floor(Math.random() * layoutTemplates.length)];

  layout.forEach(section => {
    let component;

if (typeof section === "string") {
  component = createComponentFromName(section);
} else if (section.type) {
  component = createComponentFromName(section.type, section.layout, section.props);
}


    if (component) {
      const wrapped = section.layout ? wrapWithLayout(component, section.layout) : component;
      app.appendChild(wrapped);
    }
  });
}
