export function createHero() {
  const hero = document.createElement('div');
  hero.className = 'hero bg-base-200 min-h-[50vh] rounded-box mb-6';

  hero.innerHTML = `
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello there</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
  `;

  return hero;
}
