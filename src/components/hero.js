import { randomImage } from '../generators/randomImageGenerator.js';

import { createAbsoluteHero } from './hero2.js';

export function createHero({ children = [], layout = {}, template = null, textChildren = [] } = {}) {
  const hero = document.createElement('div');
  hero.className = 'hero min-h-screen rounded-box mb-6 relative flex items-center justify-center';

  if (template !== null) {
    if (template >= 100) {
      return createAbsoluteHero({ children, template: template - 100 });
    }

    return createTemplateHero(hero, template, children, textChildren);
  }

  // fallback for manually positioned layout-based hero
  if (!children || children.length === 0) {
    return createRandomHeroTemplate(hero);
  }

  const heroContent = document.createElement('div');
  const flexDirection = layout.direction || 'flex-col';
  const alignItems = layout.align || 'items-center';
  const justifyContent = layout.justify || 'justify-center';
  const gap = layout.gap || 'gap-8';

  heroContent.className = `flex ${flexDirection} ${alignItems} ${justifyContent} ${gap} w-full h-full`;

  children.forEach(child => {
    if (child && typeof child === 'object') {
      heroContent.appendChild(child);
    }
  });

  hero.appendChild(heroContent);
  return hero;
}


// Template mode: Use existing templates but replace content dynamically
function createTemplateHero(hero, templateIndex, children, textChildren = []) {
  const { stockUrl, triUrl } = randomImage();

  const sizeOptions = ['max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'w-full', 'lg:w-1/2'];
  const biggerSizeOptions = [
    'w-full max-w-3xl',
    'w-full max-w-5xl',
    'w-full max-w-6xl',
    'w-[90%]',
    'w-[95%]',
    'lg:w-[75%]'
  ];

  const imgBiggerSize = biggerSizeOptions[Math.floor(Math.random() * biggerSizeOptions.length)];
  const imgSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
  const image = Math.random() < 0.5 ? stockUrl : triUrl;

  // Get text content from children if available
const titleText = textChildren?.[0]?.props?.text || "Dynamic Hero";
const subtitleText = textChildren?.[1]?.props?.text || "This hero got a random background.";

// Generate random position in viewport units (20vw–80vw)
const useLeft = Math.random() < 0.5; // 50% chance left or right
const horizontalOffset = Math.floor(Math.random() * 20) + 20; // 20–80

// Build the dynamic style string
const positionStyle = useLeft
  ? `left: ${horizontalOffset}vw;`
  : `right: ${horizontalOffset}vw;`;



  const templates = [
    `
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">${titleText}</h1>
        <p class="py-6">${subtitleText}</p>
        <button class="btn btn-primary">Let's Go!</button>
      </div>
    </div>
    `,

    // ==============================================================

    `
    <div class="hero-content flex flex-col lg:flex-row items-center justify-center">
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl mb-4 lg:mb-0"
      />
      <div class="lg:pl-6 text-center lg:text-left">
        <h1 class="text-5xl font-bold">${titleText}</h1>
        <p class="py-6">${subtitleText}</p>
        <button class="btn btn-primary">Get Started</button>
      </div>
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl mb-4 lg:mb-0"
      />
    </div>
    `,
// ==============================================================
      `
<div class="hero-content flex flex-row justify-center items-center gap-6 w-full">
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl"
      />

      <img
        src="${image}"
        alt="Random stock"
        class="${imgBiggerSize} rounded-lg shadow-2xl "
      />

      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl"
      />
    </div>

    
    `,
// ==============================================================

    `
    <div class="hero-content flex flex-wrap justify-center items-center gap-4">
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl"
      />

      <img
        src="${image}"
        alt="Random stock"
        class="${imgBiggerSize} rounded-lg shadow-2xl"
      />

      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl"
      />
    </div>
    `,

    // ==============================================================

    `
    <div class="hero-content flex flex-col lg:flex-row-reverse items-center justify-center">
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl mb-4 lg:mb-0"
      />
      <div class="lg:pr-6 text-center lg:text-right">
        <h1 class="text-5xl font-bold">${titleText}</h1>
        <p class="py-6">${subtitleText}</p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
    `,

   // ==============================================================
 
    `

<div class="relative w-full h-screen overflow-hidden flex items-center justify-center">
  <!-- SVG Blob with Text Inside -->
  <div class="absolute z-10 pointer-events-none"
       style="
         top: 0px;
         ${positionStyle}
         width: 1000px;
         height: 700px;
       ">
    <svg viewBox="0 0 500 500"
         xmlns="http://www.w3.org/2000/svg"
         class="w-full h-full"
         preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: rgba(225, 60, 0, 1);"></stop>
          <stop offset="100%" style="stop-color: rgb(239, 98, 51);"></stop>
        </linearGradient>
      </defs>

      <!-- Blob Path -->
      <path d="M457.5,323Q424,396,357,436.5Q290,477,208,471Q126,465,79.5,397Q33,329,34,250.5Q35,172,84,109.5Q133,47,212.5,28.5Q292,10,363,53Q434,96,462.5,173Q491,250,457.5,323Z"
            fill="url(#gradient)"></path>

      <!-- Text inside the blob -->
      <foreignObject x="0" y="0" width="500" height="500">
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="w-full h-full flex flex-col justify-center items-center text-center px-6 text-white">
          <h1 class="text-3xl font-bold">${titleText}</h1>
          <p class="py-6">${subtitleText}</p>
          <button class="btn btn-primary mt-2">Let's Go!</button>
        </div>
      </foreignObject>
    </svg>
  </div>
</div>



`

// ==============================================================


  ];

//   Use specified template or random if out of bounds
  const templateToUse = templateIndex >= 0 && templateIndex < templates.length 
    ? templateIndex 
    : Math.floor(Math.random() * templates.length);
// const templateToUse = templates.length - 1; // force blob template


  hero.innerHTML = templates[templateToUse];
  return hero;
}

// Keep the original random template function for backward compatibility
function createRandomHeroTemplate(hero) {
  const { stockUrl, triUrl } = randomImage();

  const sizeOptions = ['max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'w-full', 'lg:w-1/2'];
  const biggerSizeOptions = [
    'w-full max-w-3xl',
    'w-full max-w-5xl',
    'w-full max-w-6xl',
    'w-[90%]',
    'w-[95%]',
    'lg:w-[75%]'
  ];

  const imgBiggerSize = biggerSizeOptions[Math.floor(Math.random() * biggerSizeOptions.length)];
  const imgSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
  const image = Math.random() < 0.5 ? stockUrl : triUrl;

  const templates = [
    `
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Dynamic Hero</h1>
        <p class="py-6">This hero got a random background pattern and a random stock photo size.</p>
        <button class="btn btn-primary">Let's Go!</button>
      </div>
    </div>
    `,

    // ==============================================================

    `
    <div class="hero-content flex flex-col lg:flex-row items-center justify-center">
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl mb-4 lg:mb-0"
      />
      <div class="lg:pl-6 text-center lg:text-left">
        <h1 class="text-5xl font-bold">Box Office News!</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi.</p>
        <button class="btn btn-primary">Get Started</button>
      </div>
            <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl mb-4 lg:mb-0"
      />
    </div>
    `,
// ==============================================================
      `
<div class="hero-content flex flex-row justify-center items-center gap-6 w-full">
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl"
      />

      <img
        src="${image}"
        alt="Random stock"
        class="${imgBiggerSize} rounded-lg shadow-2xl "
      />

      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl"
      />
    </div>

    
    `,
// ==============================================================

    `
    <div class="hero-content flex flex-wrap justify-center items-center gap-4">
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl"
      />

      <img
        src="${image}"
        alt="Random stock"
        class="${imgBiggerSize} rounded-lg shadow-2xl"
      />

      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl"
      />
    </div>
    `,

    // ==============================================================

    `
    <div class="hero-content flex flex-col lg:flex-row-reverse items-center justify-center">
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl mb-4 lg:mb-0"
      />
      <div class="lg:pr-6 text-center lg:text-right">
        <h1 class="text-5xl font-bold">Box Office News!</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi.</p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
    `,

   // ==============================================================
 
    `

<div class="relative w-full h-full min-h-screen overflow-hidden flex items-center justify-center">
  <!-- Background Blob -->
  <div class="absolute inset-0 z-0 pointer-events-none">
    <svg viewBox="0 0 1000 1000" class="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: rgb(238, 205, 163);"></stop>
          <stop offset="100%" style="stop-color: rgb(239, 98, 51);"></stop>
        </linearGradient>
      </defs>
      <path d="M457.5,323Q424,396,357,436.5Q290,477,208,471Q126,465,79.5,397Q33,329,34,250.5Q35,172,84,109.5Q133,47,212.5,28.5Q292,10,363,53Q434,96,462.5,173Q491,250,457.5,323Z"
            fill="url(#gradient)"></path>
    </svg>
  </div>

  <!-- Centered Text Content -->
  <div class="relative z-10 text-center px-6">
    <h1 class="text-5xl font-bold">Hero with SVG Blob</h1>
    <p class="py-6">This version has a background SVG gradient blob layered behind the content.</p>
    <button class="btn btn-primary">Let's Go!</button>
  </div>
</div>

`

// ==============================================================


  ];

  hero.innerHTML = templates[Math.floor(Math.random() * templates.length)];
  return hero;
}


