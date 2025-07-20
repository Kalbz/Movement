import themeBaseColors from '../components/themeColors.js';

export function getColorFromTheme(themeName) {
  const colors = themeBaseColors[themeName];
  if (!colors) {
    return "#888888";
  }

  const [ , , , primary, secondary ] = colors;
  const picked = Math.random() < 0.5 ? primary : secondary;

  return picked;
}

export async function fetchThemedImage(themeName, query = "abstract") {
  const colorHex = getColorFromTheme(themeName).replace("#", "");
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

  if (!apiKey) {
    console.warn("No Pexels API key found.");
    return null;
  }

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&color=${colorHex}&per_page=16`,
    {
      headers: { Authorization: apiKey }
    }
  );

  const data = await res.json();
  const photos = data?.photos || [];

  if (photos.length > 0) {
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    return randomPhoto?.src?.large || null;
  }
  return null;
}
