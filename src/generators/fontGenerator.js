const fonts = ["Roboto", "Spicy Rice", "Playfair Display", "Montserrat", "Concert One", "Krona One", "Cinzel Decorative", "Lora", "Luckiest Guy", "Bubblegum Sans"];

export function randomFont() {
  const font = fonts[Math.floor(Math.random() * fonts.length)];
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g,"+")}&display=swap`;
  document.head.appendChild(link);

  link.onload = () => {
    document.body.style.fontFamily = `"${font}", sans-serif`;
  };
}
