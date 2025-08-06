import themeBaseColors from '../components/themeColors.js';

export function getCurrentTheme() {
  return localStorage.getItem('theme') ||
         document.documentElement.getAttribute('data-theme') ||
         'light';
}

export function getColorFromTheme(themeName = getCurrentTheme()) {
  const colors = themeBaseColors[themeName];
  if (!colors) {
    console.warn(`Unknown theme: "${themeName}"`);
    return "#888888";
  }

  const [ , , , primary, secondary ] = colors;
  const picked = Math.random() < 0.5 ? primary : secondary;
  console.log(picked, `color picked from theme "${themeName}"`);
  return picked;
}

export async function fetchThemedImage(query = "abstract") {
  const themeName = getCurrentTheme();
  const colorHex = getColorFromTheme(themeName).replace("#", "");
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

  if (!apiKey) {
    console.warn("No Pexels API key found.");
    return null;
  }

  try {
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
      return randomPhoto?.src?.original || null;
    }

    console.warn("No themed images found.");
    return null;
  } catch (err) {
    console.error("Failed to fetch themed image:", err);
    return null;
  }
}
