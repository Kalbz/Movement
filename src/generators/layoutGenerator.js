import { createCarousel } from "../components/carousel";
import { createHero } from "../components/hero";
import { createAvatar } from "../components/avatar";
import { createNavbar } from "../components/navbar";

export function randomLayout() {
  const container = document.getElementById("app");
  container.innerHTML = "";

  const navbar = createNavbar();
  container.appendChild(navbar);

  const hero = createHero();
  container.appendChild(hero);

  const layoutWrapper = document.createElement("div");
  container.appendChild(layoutWrapper);

  const layoutType = Math.random() < 0.5 ? "grid" : "flex";
  layoutWrapper.className =
    layoutType === "grid"
      ? "grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-base-200 border-4 border-dashed border-secondary rounded-box"
      : "flex flex-wrap justify-center gap-6 p-6 bg-base-300 border-4 border-dotted border-accent rounded-box";

  const carousel = createCarousel();
  layoutWrapper.appendChild(carousel);

  const avatar = createAvatar();
  layoutWrapper.appendChild(avatar);

  const numItems = Math.floor(Math.random() * 5) + 4;
  for (let i = 0; i < numItems; i++) {
    const box = document.createElement("div");
    const width = Math.random() < 0.5 ? "w-32" : "w-48";
    const height = Math.random() < 0.5 ? "h-32" : "h-48";
    const bg = i % 2 === 0 ? "bg-primary" : "bg-secondary";

    box.className = `
        ${width} ${height}
        ${bg} text-primary-content
        flex items-center justify-center text-lg font-bold
        border border-white border-dashed rounded-lg
        shadow-lg hover:scale-105 transition-transform duration-300
        `.trim();

    box.textContent = `Box ${i + 1}`;
    layoutWrapper.appendChild(box);
  }
}


export function generateRandomLayout() {
  const layout = [];

  const components = [
    "Hero",
    "Carousel",
    "Boxes",
    "Card",
    "Accordion",
    "Table",
    "Comparison",
    "Divider",
    "Spacer",
  ];

  // Randomly decide if we want a Navbar
  const includeNavbar = Math.random() < 0.7;
  if (includeNavbar) {
    layout.push({ type: "Navbar" });
  }

  let hasHero = false;

  // We’ll collect some components, then insert Hero at a legal spot
  const body = [];

  // Shuffle components
  for (let i = components.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [components[i], components[j]] = [components[j], components[i]];
  }

  for (const component of components) {
    // Skip rules

    // Accordion should not come directly after Navbar
    if (
      component === "Accordion" &&
      layout[layout.length - 1]?.type === "Navbar"
    ) {
      continue;
    }

    // Card/Table should not come before Hero
    if (!hasHero && (component === "Card" || component === "Table")) {
      continue;
    }

    // Avatar is NOT allowed outside Hero
    if (component === "Avatar") {
      continue;
    }

    // Hero is special — insert once with optional Avatar
    if (component === "Hero" && !hasHero) {
      hasHero = true;

      // Decide randomly if Avatar should be included
      const includeAvatar = Math.random() < 0.5;

      const children = [
        {
          type: "Text",
          props: {
            text: getRandomTitle(),
            size: "text-4xl",
            align: "center"
          }
        },
        {
          type: "Text",
          props: {
            text: getRandomSubtitle(),
            size: "text-lg",
            color: "text-secondary"
          }
        }
      ];

      if (includeAvatar) {
        children.push({ type: "Avatar" });
      }

      layout.push({
        type: "Hero",
        layout: {
          template: Math.floor(Math.random() * 5),
          children
        }
      });
      continue;
    }

    // Spacer with random size
    if (component === "Spacer") {
      body.push({
        type: "Spacer",
        layout: {
          direction: "vertical",
          size: String(Math.floor(Math.random() * 64 + 16))
        }
      });
      continue;
    }

    // All other components go to body
    body.push({ type: component });
  }

  // Ensure there's at least one Hero (mandatory for rules to work)
  if (!hasHero) {
    layout.unshift({
      type: "Hero",
      layout: {
        template: Math.floor(Math.random() * 5),
        children: [
          {
            type: "Text",
            props: {
              text: getRandomTitle(),
              size: "text-4xl",
              align: "center"
            }
          },
          {
            type: "Text",
            props: {
              text: getRandomSubtitle(),
              size: "text-lg",
              color: "text-secondary"
            }
          },
          { type: "Avatar" }
        ]
      }
    });
  }

  // Append the remaining body
  layout.push(...body);

  // Always end with a footer
  layout.push({ type: "Footer" });

  return layout;
}


function getRandomTitle() {
  const titles = [
    "Welcome to the Jungle",
    "Your Digital Playground",
    "Creative Sparks Fly Here",
    "Design Meets Code",
    "Crafted with Passion"
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomSubtitle() {
  const subtitles = [
    "Where creativity meets chaos.",
    "Start your journey today.",
    "Built for impact.",
    "Turn your ideas into reality.",
    "See what’s possible."
  ];
  return subtitles[Math.floor(Math.random() * subtitles.length)];
}
