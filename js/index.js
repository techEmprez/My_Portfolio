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
  if (
    window.innerWidth >= 768 &&
    qs('div.nav-links').classList.contains('enlarged-menu')
  ) {
    toggleBurger();
  }
};

qsa('div.nav-links a').forEach((link) => {
  link.addEventListener('click', (e) => {
    qs(e.target.getAttribute('href').replace('#', '.')).scrollIntoView();
  });
});

const projects = [
  {
    title: 'Project name goes here',
    image: 'images/project1.svg',
    imageAlternative: 'Project 1',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript'],
  },
  {
    title: 'Project name goes here',
    image: 'images/project2.svg',
    imageAlternative: 'Project 2',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript'],
  },
  {
    title: 'Project name goes here',
    image: 'images/project3.svg',
    imageAlternative: 'Project 3',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript'],
  },
  {
    title: 'Project name goes here',
    image: 'images/project4.svg',
    imageAlternative: 'Project 4',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript'],
  },
  {
    title: 'Project name goes here',
    image: 'images/project5.svg',
    imageAlternative: 'Project 5',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript'],
  },
  {
    title: 'Project name goes here',
    image: 'images/project6.svg',
    imageAlternative: 'Project 6',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript'],
  },
];

const projectWrapper = qs('.project-wrapper');

function produceElement(obj) {
  const element = document.createElement(obj.type);
  delete obj.type;

  for (let prop in obj) {
    if (prop === 'class') {
      if (typeof obj.class === 'object') {
        element.classList.add(...obj.class);
      } else {
        element.classList.add(obj.class);
      }
    } else {
      element[prop] = obj[prop];
    }
  }

  return element;
}

let itterationIndex = 1;

for (let project of projects) {
  const article = produceElement({
    type: 'article',
    class: ['projects', `p${itterationIndex}`],
  });
  article.appendChild(
    produceElement({
      type: 'img',
      src: project.image,
      alt: project.imageAlternative,
      class: 'project-img',
    })
  );
  const div = produceElement({
    type: 'div',
    class: ['project-info', `pb${itterationIndex++}`],
  });
  div.appendChild(
    produceElement({
      type: 'h3',
      class: 'project-name',
      textContent: project.title,
    })
  );
  const div2 = produceElement({
    type: 'div',
    class: 'language-info',
  });

  for (let language of project.languages) {
    div2.appendChild(
      produceElement({
        type: 'span',
        class: 'language',
        textContent: language,
      })
    );
  }

  div.appendChild(div2);
  const a = produceElement({
    type: 'a',
    href: '#',
    class: ['button', 'navy-button', 'project-view'],
    textContent: 'See this project ',
  });
  a.appendChild(
    produceElement({
      type: 'i',
      class: ['fa-solid', 'fa-arrow-right'],
    })
  );
  div.appendChild(a);
  article.appendChild(div);

  projectWrapper.appendChild(article);
}

for (const button of qsa('.project-view')) {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const { target } = e;
    const article = target.closest('article');
    const alt = qs('img', article).alt;
    const data = projects.find((project) => project.imageAlternative === alt);

    const modal = qs('.modalView');
    modal.classList.remove('no-display');
    modal.scrollIntoView();
    qs('h1', modal).textContent = data.title;
    qsa('li', modal).map((li, i) => {
      return (li.textContent = data.languages[i]);
    });

    // THIS CHANGES THE IMAGES ON THE MODAL FROM THE PROJECTS
    // qs("img", modal).src = data.image;
    qsa('img:not(.closeBtn, .modal-arrow-left, .modal-arrow-right)', modal).map(
      (img) => {
        return (img.src = data.image);
      }
    );
  });
}

qs('.closeBtn').addEventListener('click', function () {
  const modal = qs('.modalView');
  modal.classList.add('no-display');
  qs('header').scrollIntoView({ behavior: 'smooth' });
});
