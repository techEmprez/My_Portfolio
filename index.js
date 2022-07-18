function qs(selector = '*', element = document) {
  return element.querySelector(selector);
}

function qsa(selector = '*', element = document) {
  return [...element.querySelectorAll(selector)];
}

const burger = qs('img[alt="hamburger"]');
const burgerClose = qs('img[alt="hamburger close"]');

function toggleBurger() {
  burger.classList.toggle('no-display');
  burgerClose.classList.toggle('no-display');
  qs('div.nav-links').classList.toggle('enlarged-menu');
}

qs('.hamburger').addEventListener('click', (e) => {
  const { target } = e;
  if (!target.tagName.toLowerCase() === 'img') return;

  toggleBurger();
});

qs('div.nav-links').addEventListener('click', (e) => {
  if (window.innerWidth >= 768) return;
  if (e.target.tagName.toLowerCase() !== 'a') return;

  toggleBurger();
  qs(e.target.getAttribute('href').replace('#', '.')).scrollIntoView();
});

window.onresize = () => {
  if (window.innerWidth >= 768 && qs('div.nav-links').classList.contains('enlarged-menu')) {
    toggleBurger();
  }
};

qsa('div.nav-links a').forEach((link) => {
  link.addEventListener('click', (e) => {
    qs(e.target.getAttribute('href').replace('#', '.')).scrollIntoView();
  });
});
