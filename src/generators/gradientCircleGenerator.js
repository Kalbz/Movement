export async function randomGradientCircle(c) {
  try {
    const result = await fetch('https://uigradients.com/gradients.json');
    const list = await result.json();
    const { colors } = list[Math.floor(Math.random() * list.length)];

    const ctx = c.getContext('2d');
    const x = 145, y = 75, r = 65;

    // Create a radial gradient centered on the circle
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);

    // Set color stops:
    // One at start (0), one at the outer edge (1)
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1] || colors[0]); // fallback if only one color

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

  } catch (e) {
    console.error("Failed to grab gradient for circle:", e);
  }
}
