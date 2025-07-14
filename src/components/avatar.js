export function createAvatar({ shape = 'rounded-full', size = "w-96 h-96" } = {}) {
  const avatar = document.createElement("div");
  avatar.className = `avatar ${size}`;

  const img = document.createElement("div");
  img.className = `${shape} overflow-hidden`;

  img.innerHTML = `<img src="${shape === 'rounded-xl'
    ? 'https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp'
    : 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'}" />`;

  avatar.appendChild(img);
  return avatar;
}
