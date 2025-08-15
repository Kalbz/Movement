import { createImage } from "../components/image.js";

export async function createCard(theme = "light") {
  const card = document.createElement("div");
  card.className = "card w-96 mx-auto shadow-sm overflow-hidden";
  
  console.log("Card Ran");

  const imgEl = await createImage({
    theme,
    alt: "Random themed photo",
    className: "object-cover w-full h-48"
  });

  const figure = document.createElement("figure");
  figure.className = "m-0";
  figure.appendChild(imgEl);

  card.appendChild(figure);
  return card;
}
