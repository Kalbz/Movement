import { randomImage } from '../generators/randomImageGenerator.js';

export function createCard() {
  // grab both URLs
  const { stockUrl, triUrl } = randomImage();

  // build the wrapper DIV
  const card = document.createElement('div');
  card.className = 'card w-96 shadow-sm overflow-hidden';
  // set the trianglify pattern as the *background* of the card
  card.style.backgroundImage = `url("${triUrl}")`;
  card.style.backgroundSize  = 'cover';
  card.style.backgroundRepeat = 'no-repeat';
  card.style.backgroundPosition = 'center';

  const image = Math.random() < 0.5 ? stockUrl : triUrl;

  card.innerHTML = `
    <figure class="m-0">
      <img src="${image}" alt="Random photo" class="object-cover w-full h-48" />
    </figure>
    <div class="card-body bg-base-100 bg-opacity-80">
      <h2 class="card-title">Card Title</h2>
      <p>Here’s a random stock photo on a Trianglify background.</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  `;

  return card;
}
