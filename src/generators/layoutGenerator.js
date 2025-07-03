import { createCarousel } from "../components/carousel";
import { createHero } from "../components/hero";
import { createAvatar } from "../components/avatar";
import { createNavbar } from "./navbarGenerator";

export function randomLayout() {
    const container = document.getElementById('app');
    container.innerHTML = '';

    const navbar = createNavbar();
    container.appendChild(navbar);

    const hero = createHero();
    container.appendChild(hero);

    const layoutWrapper = document.createElement('div');
    container.appendChild(layoutWrapper);

    const layoutType = Math.random() < 0.5 ? 'grid' : 'flex';
    layoutWrapper.className = layoutType === 'grid'
        ? 'grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-base-200 border-4 border-dashed border-secondary rounded-box'
        : 'flex flex-wrap justify-center gap-6 p-6 bg-base-300 border-4 border-dotted border-accent rounded-box';

    const carousel = createCarousel();
    layoutWrapper.appendChild(carousel);

    const avatar = createAvatar();
    layoutWrapper.appendChild(avatar);

    const numItems = Math.floor(Math.random() * 5) + 4;
    for (let i = 0; i < numItems; i++) {
        const box = document.createElement('div');
        const width = Math.random() < 0.5 ? 'w-32' : 'w-48';
        const height = Math.random() < 0.5 ? 'h-32' : 'h-48';
        const bg = i % 2 === 0 ? 'bg-primary' : 'bg-secondary';

        box.className = `
        ${width} ${height}
        ${bg} text-primary-content
        flex items-center justify-center text-lg font-bold
        border border-white border-dashed rounded-lg
        shadow-lg hover:scale-105 transition-transform duration-300
        `.trim();

        box.textContent = `Box ${i + 1}`;
        layoutWrapper.appendChild(box);
    }
}