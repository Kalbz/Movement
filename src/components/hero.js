import { randomImage } from '../generators/randomImageGenerator.js';

export function createHero() {
  const hero = document.createElement('div');
  hero.className = 'hero min-h-screen rounded-box mb-6 relative overflow-hidden';

  const { stockUrl, triUrl } = randomImage();

  const sizeOptions = ['max-w-sm','max-w-md','max-w-lg','max-w-xl','w-full','lg:w-1/2'];
  const imgSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];

    const image = Math.random() < 0.5 ? stockUrl : triUrl;


  const templates = [
    `
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Dynamic Hero</h1>
        <p class="py-6">This hero got a random background pattern and a random stock photo size.</p>
        <button class="btn btn-primary">Let’s Go!</button>
      </div>
    </div>
    `,
    `
    <div class="hero-content flex-col lg:flex-row items-center">
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl mb-4 lg:mb-0"
      />
      <div class="lg:pl-6">
        <h1 class="text-5xl font-bold">Box Office News!</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi.</p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
    `,
    `
    <div class="hero-content flex-col lg:flex-row-reverse items-center">
      <img
        src="${image}"
        alt="Random stock"
        class="${imgSize} rounded-lg shadow-2xl mb-4 lg:mb-0"
      />
      <div class="lg:pr-6">
        <h1 class="text-5xl font-bold">Box Office News!</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi.</p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
    `
  ];

  hero.innerHTML = templates[Math.floor(Math.random() * templates.length)];


  return hero;
}
