// import { layoutTemplates } from "./layoutTemplate.js";
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
import { createImage } from "../components/image.js";
import { createSplit } from "../components/split.js";
import { generateRandomLayout } from "../generators/layoutGenerator.js"; // wherever you put it
export async function createComponentFromName(type, layout = {}, props = {}, theme = "light") {
  switch (type) {
    case "Navbar":
      return createNavbar();

    case "Hero": {
      if (layout.children && Array.isArray(layout.children)) {
        const textChildren = layout.children;

        const childrenForDOM = await Promise.all(
          layout.children.map(child => {
            if (child.type) {
              return createComponentFromName(child.type, child.layout || {}, child.props || {}, theme);
            }
            return null;
          })
        );

        const templateIndex = layout.template !== undefined ? layout.template : null;

        return createHero({
          children: childrenForDOM.filter(Boolean),
          layout,
          template: templateIndex,
          textChildren
        });
      }

      return createHero(); // fallback
    }

     case "Split": {
      const childSpecs = layout.children || props.children || [];
      const domChildren = await Promise.all(
        childSpecs.map(spec =>
          spec?.type
            ? createComponentFromName(spec.type, spec.layout || {}, spec.props || {}, theme)
            : null
        )
      );
      return createSplit({
        children: domChildren.filter(Boolean).slice(0, 2), // left, right
        ratio: props.ratio || "1:1",
        reverse: !!props.reverse,
        gap: props.gap || "gap-8",
      });
    }

    case "Carousel":
      return createCarousel();

    case "Avatar":
      return createAvatar();

    case "Boxes":
      return await createBoxes(theme);


    case "Footer":
      return createFooter();

    case "Card":
      return await createCard(theme);


    case "Accordion":
      return createAccordion();

    case "Table":
      return createTable();

    case "Image":
      return await createImage({ ...props, theme });

    case "Comparison":
      return await createDiff(theme);


    case "Text":
      return createText(props);

    case "LongText":
      return createLongText();

    case "Spacer": {
      const direction = layout.direction || "vertical";
      const size = layout.size || "0";
      const background = layout.background || "";
      const grow = layout.grow !== false;
      return createSpacer({ direction, size, background, grow });
    }

    case "Divider": {
      const cardA = await createCard(theme);
      const cardB = await createCard(theme);
      return createDivider(cardA, cardB, { vertical: true });
    }


    default:
      console.warn(`Unknown component type: ${type}`);
      return null;
  }
}



// export async function renderRandomLayout(themeName = "light") {
//   const app = document.getElementById("app");
//   app.innerHTML = "";

//   const layout = await generateRandomLayout(themeName);

//   for (const section of layout) {
//     let component;

//     if (typeof section === "string") {
//       component = await createComponentFromName(section, {}, {}, themeName);
//     } else if (section.type) {
//       component = await createComponentFromName(section.type, section.layout, section.props, themeName);
//     }

//     if (component) {
//       const wrapped = section.layout ? wrapWithLayout(component, section.layout) : component;
//       app.appendChild(wrapped);
//     }
//   }
// }

export async function renderRandomLayout(themeName = "light") {
const app = document.getElementById("app");
app.innerHTML = "";
app.classList.add("flex", "flex-col", "items-center", "text-center", "gap-8");


  const layout = await generateRandomLayout(themeName);

  // Shuffle everything except Navbar and Footer
  const randomized = randomizeOrder(layout, "shuffle");

  for (const section of randomized) {
    let component;

    if (typeof section === "string") {
      component = await createComponentFromName(section, {}, {}, themeName);
    } else if (section.type) {
      component = await createComponentFromName(
        section.type,
        section.layout,
        section.props,
        themeName
      );
    }

    if (component) {
      const wrapped = section.layout ? wrapWithLayout(component, section.layout) : component;
      app.appendChild(wrapped);
    }
  }
}


// --- helpers ---
function isType(entry, name) {
  if (typeof entry === "string") return entry === name;
  return entry && typeof entry === "object" && entry.type === name;
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// If you prefer a *cyclic shift* instead of full shuffle, flip mode to "shift".
function randomizeOrder(layout, mode = "shuffle") {
  const headers = layout.filter(e => isType(e, "Navbar"));
  const footers = layout.filter(e => isType(e, "Footer"));
  const middle  = layout.filter(e => !isType(e, "Navbar") && !isType(e, "Footer"));

  if (mode === "shift" && middle.length > 1) {
    const k = Math.floor(Math.random() * middle.length); // 0..len-1
    const shifted = middle.slice(k).concat(middle.slice(0, k));
    return [...headers, ...shifted, ...footers];
  }

  // default: full shuffle of the middle
  return [...headers, ...shuffleInPlace(middle), ...footers];
}
