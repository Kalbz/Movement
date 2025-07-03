export function createNavbar() {
    const navbar = document.createElement('navbar');
    navbar.className = "navbar bg-base-100 w-full shadow-sm";

    navbar.innerHTML = `
    <a class="btn btn-ghost text-xl">daisyUI</a>
    `;

    return navbar;


}