import { fetchThemedImage } from '../generators/colorImageGenerator.js';

export async function createCard(theme = "light") {
  const imageUrl = await fetchThemedImage(theme);
  const fallbackUrl = "https://source.unsplash.com/random/600x400";

  const card = document.createElement('div');
  card.className = 'card w-96 mx-auto shadow-sm overflow-hidden';


  card.style.backgroundImage = `url("${imageUrl || fallbackUrl}")`;
  card.style.backgroundSize = 'cover';
  card.style.backgroundRepeat = 'no-repeat';
  card.style.backgroundPosition = 'center';

  const image = imageUrl || fallbackUrl;

  // card.innerHTML = `
  //   <figure class="m-0">
  //     <img src="${image}" alt="Random themed photo" class="object-cover w-full h-48" />
  //   </figure>
  //   <div class="card-body bg-base-100 bg-opacity-80">
  //     <h2 class="card-title">Themed Card</h2>
  //     <p>This image is matched to your current color theme!</p>
  //     <div class="card-actions justify-end">
  //       <button class="btn btn-primary">Buy Now</button>
  //     </div>
  //   </div>
  // `;

  card.innerHTML = `
    <figure class="m-0">
      <img src="${image}" alt="Random themed photo" class="object-cover w-full h-48" />
    </figure>
  `;

  return card;
}
