
export async function randomGradient() {
    try {
        const result = await fetch('https://uigradients.com/gradients.json');
        const list = await result.json();

        const { colors } = list[Math.floor(Math.random() * list.length)];
        const direction = ['to top', 'to right', 'to bottom right'][Math.floor(Math.random() * 3)];
        const gradient = `linear-gradient(${direction}, ${colors.join(', ')})`;

        document.body.style.backgroundImage = gradient;
    } catch (e) {
        console.error('Failed to grab gradient', e);
    }
}

