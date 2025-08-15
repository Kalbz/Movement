export function createAvatar({ shape = 'rounded-full', useCustom = true } = {}) {
  const avatar = document.createElement("div");
  avatar.className = `avatar w-full h-full flex items-center justify-center`;

  const imgWrapper = document.createElement("div");
  imgWrapper.className = `${shape} overflow-hidden w-full h-full max-w-full max-h-full`;

  // respects vite.config.js "base" (e.g. '/Movement/')
  const imgSrc = useCustom
    ? `${import.meta.env.BASE_URL}icons/Profilbild2.png`
    : (shape === 'rounded-xl'
        ? 'https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp'
        : 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp');

  imgWrapper.innerHTML = `<img src="${imgSrc}" class="w-full h-full object-cover" />`;

  avatar.appendChild(imgWrapper);
  return avatar;
}
