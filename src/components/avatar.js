export function createAvatar() {
    const avatar = document.createElement("div");
    avatar.className = "avatar";

    const shape = Math.random() < 0.5 ? 'rounded-xl' : 'rounded-full';

    const imgSrc = shape === 'rounded-xl'
    ? 'https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp'
    : 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp';

    avatar.innerHTML = `
    <div class="w24 ${shape}">
        <img src="${imgSrc}" />
    </div>
    `
  return avatar;
}
