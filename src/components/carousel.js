export function createCarousel() {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex justify-center mb-6';

  const carousel = document.createElement('div');
  carousel.className = 'carousel carousel-center gap-4 rounded-box';

  carousel.innerHTML = `
    ${[
      'photo-1559703248-dcaaec9fab78',
      'photo-1565098772267-60af42b81ef2',
      'photo-1572635148818-ef6fd45eb394',
      'photo-1494253109108-2e30c049369b',
      'photo-1550258987-190a2d41a8ba',
      'photo-1559181567-c3190ca9959b',
      'photo-1601004890684-d8cbf643f5f2',
      'photo-1559703248-dcaaec9fab78',
      'photo-1565098772267-60af42b81ef2',
      'photo-1572635148818-ef6fd45eb394',
      'photo-1494253109108-2e30c049369b',
      'photo-1550258987-190a2d41a8ba',
      'photo-1559181567-c3190ca9959b',
      'photo-1601004890684-d8cbf643f5f2',
      'photo-1559703248-dcaaec9fab78',
      'photo-1565098772267-60af42b81ef2',
      'photo-1572635148818-ef6fd45eb394',
      'photo-1494253109108-2e30c049369b',
      'photo-1550258987-190a2d41a8ba',
      'photo-1559181567-c3190ca9959b',
      'photo-1601004890684-d8cbf643f5f2',
    ]
      .map(
        (id) => `
        <div class="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/${id}.webp"
            alt="carousel image"
            class="w-40 h-40 object-cover rounded-xl" />
        </div>`
      )
      .join('')}
  `;

  wrapper.appendChild(carousel);
  return wrapper;
}
