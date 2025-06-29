import { themeChange } from 'theme-change';


export function randomTheme(){

    const themes = ["cyberpunk"];

    const random = themes[Math.floor(Math.random() * themes.length)];
    document.documentElement.setAttribute('data-theme', random);
    localStorage.setItem('theme', random);

    themeChange();

}

