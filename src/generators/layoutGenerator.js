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
  const body = [];

  // Navbar is optional but fixed to the top later by randomizeOrder()
  const includeNavbar = Math.random() < 0.7; // keep your 70%
  if (includeNavbar) layout.push({ type: "Navbar" });

  // --- HERO: ensure at least one ---
  const heroSelected = appear(COMPONENT_SCALES.Hero.appearanceScale);
  if (heroSelected) {
    const includeAvatar = Math.random() < 0.5;
    const useAbsoluteHero = Math.random() < 0.9;

    const children = [
      { type: "Text", props: { text: getRandomTitle(), size: "text-4xl", align: "center" } },
      { type: "Text", props: { text: getRandomSubtitle(), size: "text-lg", color: "text-secondary" } },
    ];
    if (includeAvatar) children.push({ type: "Avatar" });

    body.push({
      type: "Hero",
      layout: {
        template: useAbsoluteHero ? 100 + Math.floor(Math.random() * 5) : Math.floor(Math.random() * 6),
        children
      }
    });
  } else {
    // hard guarantee: add one anyway
    body.push({
      type: "Hero",
      layout: {
        template: Math.floor(Math.random() * 6),
        children: [
          { type: "Text", props: { text: getRandomTitle(), size: "text-4xl", align: "center" } },
          { type: "Text", props: { text: getRandomSubtitle(), size: "text-lg", color: "text-secondary" } },
          { type: "Avatar" }
        ]
      }
    });
  }

  
  // ✅ Append your new section logic here
  // body.push({
  //   type: "HeroSection",
  //   layout: { template: Math.random() < 0.5 ? "split" : (Math.random() < 0.5 ? "center" : "left") },
  //   props: { name: "Your Name", role: "Creative Engineer" }
  // });

  // if (appear(COMPONENT_SCALES.AboutSection.appearanceScale)) {
  //   body.push({ type: "AboutSection", layout: { style: "columns" } });
  // }

  // if (appear(COMPONENT_SCALES.ContactSection.appearanceScale)) {
  //   body.push({ type: "ContactSection" });
  // }

//   body.push({
//   type: "ProjectsSection",
//   // Optional: force a specific layout 33% of the time, otherwise let it randomize inside createProjectsSection
//   layout: { layout: Math.random() < 0.33 ? (Math.random() < 0.5 ? "grid" : "masonry") : undefined },
//   // Optional: pass custom data instead of DEFAULT_PROJECTS
//   // props: { projects: CUSTOM_PROJECTS }
// });

  // --- Poisson-ish multiplicities via biased sampler ---
  const TYPES = Object.keys(COMPONENT_SCALES).filter(t => t !== "Hero");

  for (const type of TYPES) {
    const { appearanceScale, quantityScale, min, max } = COMPONENT_SCALES[type];

    if (!appear(appearanceScale)) continue;

    let count = biasedIntBetween(min, max, quantityScale);
    if (count === 0 && max > 0) count = 1; // if it appears, ensure at least 1

    for (let i = 0; i < count; i++) {
      // Optional per-item variation
      if (type === "Image") {
        body.push({
          type: "Image",
          // you can randomize props here if you want (sizes, aspect, etc.)
          props: { variant: Math.random() < 0.5 ? "wide" : "square" }
        });
        continue;
      }
      if (type === "Spacer") {
        body.push({
          type: "Spacer",
          layout: { direction: "vertical", size: String(Math.floor(Math.random() * 64 + 16)) }
        });
        continue;
      }
      if (type === "Split") {
  for (let i = 0; i < count; i++) {
    const imageFirst = Math.random() < 0.6;  // bias to Image left
    const reverse = Math.random() < 0.5;     // flip on desktop
    const ratios = ["1:1","2:1","1:2","3:2","2:3"];
    const ratio = ratios[Math.floor(Math.random()*ratios.length)];

    const textSizes = ["text-base", "text-lg", "text-xl"];
    const size = textSizes[Math.floor(Math.random()*textSizes.length)];

    const leftSpec  = imageFirst
      ? { type: "Image", props: { variant: Math.random() < 0.5 ? "wide" : "square" } }
      : { type: "Text",  props: { text: getRandomSubtitle(), size, align: "left" } };

    const rightSpec = imageFirst
      ? { type: "Text",  props: { text: getRandomSubtitle(), size, align: "left" } }
      : { type: "Image", props: { variant: Math.random() < 0.5 ? "wide" : "square" } };

    body.push({
      type: "Split",
      props: { ratio, reverse, gap: "gap-10" },
      layout: {
        // optional: also bias the whole block left/right in the column
        align: Math.random() < 0.5 ? "left" : "right",
        children: [leftSpec, rightSpec]
      }
    });
  }
  continue; // skip the generic push for Split
}

      body.push({ type });
    }
  }

  // Soft cap to avoid runaway pages (tune MAX_BODY_ITEMS as you like)
  const clamped = clampBody(body);

  // Always end with a footer
  layout.push(...clamped);
  layout.push({ type: "Footer" });

  return layout;
}


// === Scales & limits (0..10) ===
// appearanceScale: chance to appear at all
// quantityScale: bias for how many to place if it appears
const COMPONENT_SCALES = {
  Hero:        { appearanceScale: 9,  quantityScale: 1, min: 1, max: 1 },
  Image:       { appearanceScale: 7,  quantityScale: 8, min: 0, max: 6 },
  Carousel:    { appearanceScale: 4,  quantityScale: 1, min: 0, max: 2 },
  Boxes:       { appearanceScale: 5,  quantityScale: 2, min: 0, max: 2 },
  Card:        { appearanceScale: 6,  quantityScale: 4, min: 0, max: 8 },
  Accordion:   { appearanceScale: 0,  quantityScale: 1, min: 0, max: 2 },
  Table:       { appearanceScale: 2,  quantityScale: 1, min: 0, max: 1 },
  Comparison:  { appearanceScale: 4,  quantityScale: 1, min: 0, max: 2 },
  Divider:     { appearanceScale: 5,  quantityScale: 2, min: 0, max: 3 },
  Spacer:      { appearanceScale: 6,  quantityScale: 3, min: 0, max: 4 },
  LongText:    { appearanceScale: 3,  quantityScale: 1, min: 0, max: 2 },
  Text:        { appearanceScale: 6,  quantityScale: 2, min: 0, max: 5 },
  HeroSection:   { appearanceScale: 9, quantityScale: 1, min: 1, max: 1 },
AboutSection:  { appearanceScale: 6, quantityScale: 1, min: 1, max: 1 },
ContactSection:{ appearanceScale: 6, quantityScale: 1, min: 1, max: 1 },
ProjectsSection: { appearanceScale: 8, quantityScale: 1, min: 1, max: 1 },


  Split: { appearanceScale: 6, quantityScale: 2, min: 0, max: 3 },

  // Avatar intentionally omitted (only lives inside Hero)
};

// Optional overall cap so pages don’t explode
const MAX_BODY_ITEMS = 16;

// --- helpers ---
function appear(scale0to10) {
  const p = Math.max(0, Math.min(1, scale0to10 / 10));
  return Math.random() < p;
}

function biasedIntBetween(min, max, quantityScale0to10) {
  if (max <= min) return min;
  // Map 0..10 to an exponent that biases toward min (low) or max (high)
  // scale=0 => exp≈2 (skews low), scale=10 => exp≈0.2 (skews high)
  const t = Math.max(0, Math.min(1, quantityScale0to10 / 10));
  const exponent = 2 - 1.8 * t; // 2..0.2
  const u = Math.random() ** exponent;
  return Math.round(min + u * (max - min));
}

function clampBody(items) {
  if (items.length <= MAX_BODY_ITEMS) return items;
  // Keep diversity by removing random entries but never the first matching Hero
  const result = [];
  let heroKept = false;
  for (const it of items) {
    if (it.type === "Hero" && !heroKept) {
      result.push(it);
      heroKept = true;
      continue;
    }
    result.push(it);
  }
  while (result.length > MAX_BODY_ITEMS) {
    // remove a non-Hero random index
    const idxs = result
      .map((x, i) => ({ x, i }))
      .filter(o => o.x.type !== "Hero")
      .map(o => o.i);
    if (!idxs.length) break;
    const kill = idxs[Math.floor(Math.random() * idxs.length)];
    result.splice(kill, 1);
  }
  return result;
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
