import { fetchThemedImage } from '../generators/colorImageGenerator.js';

export async function createBoxes(theme = "light") {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center gap-4 p-6';

  const wrapper = document.createElement('div');
  wrapper.className = Math.random() < 0.5
    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 rounded-box'
    : 'flex flex-wrap justify-center gap-6 rounded-box';

// const controls = document.createElement('div');
// controls.className = 'flex gap-4';

// const plusBtn = document.createElement('button');
// plusBtn.textContent = '+';
// plusBtn.className = 'btn bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded';
// plusBtn.onclick = () => addBox();

// const minusBtn = document.createElement('button');
// minusBtn.textContent = '–';
// minusBtn.className = 'btn bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded';
// minusBtn.onclick = () => {
//   if (wrapper.lastChild) wrapper.removeChild(wrapper.lastChild);
// };

// controls.appendChild(plusBtn);
// controls.appendChild(minusBtn);

//   container.appendChild(controls);
  container.appendChild(wrapper);

  const numItems = Math.floor(Math.random() * 5) + 4;
  const imagePromises = Array.from({ length: numItems }, () => fetchThemedImage(theme));
  const imageUrls = await Promise.all(imagePromises);

  for (let i = 0; i < numItems; i++) {
    await addBox(imageUrls[i]);
  }

async function addBox(url = null) {
  const imageUrl = url || await fetchThemedImage(theme) || 'https://source.unsplash.com/random/400x400';

  const box = document.createElement('div');
  box.className = `
    w-48 h-48 overflow-hidden
    rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border
    bg-white flex items-center justify-center relative group
  `.trim();

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = `Themed image`;
  img.className = 'w-full h-full object-cover cursor-pointer';
  
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.className = 'hidden';

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  // Click image to trigger file input
  img.addEventListener('click', () => {
    fileInput.click();
  });

  box.appendChild(img);
  box.appendChild(fileInput);
  wrapper.appendChild(box);
}


  return container;
}
