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

const projects = [
  {
    title: 'Project name goes here',
    image: 'images/project1.svg',
    imageAlternative: 'Project 1',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  },
  {
    title: 'Project name goes here',
    image: 'images/project2.svg',
    imageAlternative: 'Project 2',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  },
  {
    title: 'Project name goes here',
    image: 'images/project3.svg',
    imageAlternative: 'Project 3',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  },
  {
    title: 'Project name goes here',
    image: 'images/project4.svg',
    imageAlternative: 'Project 4',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  },
  {
    title: 'Project name goes here',
    image: 'images/project5.svg',
    imageAlternative: 'Project 5',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  },
  {
    title: 'Project name goes here',
    image: 'images/project6.svg',
    imageAlternative: 'Project 6',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  }
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
    class: ['projects', `p${itterationIndex}`]
  });
  article.appendChild(produceElement({
    type: 'img',
    src: project.image,
    alt: project.imageAlternative,
    class: 'project-img'
  }));
  const div = produceElement({
    type: 'div',
    class: ['project-info', `pb${itterationIndex++}`]
  });
  div.appendChild(produceElement({
    type: 'h3',
    class: 'project-name',
    textContent: project.title
  }));
  const div2 = produceElement({
    type: 'div',
    class: 'language-info'
  });
  
  for (let language of project.languages) {
    div2.appendChild(produceElement({
      type: 'span',
      class: 'language',
      textContent: language
    }));
  }

  div.appendChild(div2);
  const a = produceElement({
    type: 'a',
    href: '#',
    class: ['button', 'navy-button', 'project-view'],
    textContent: 'See this project '
  });
  a.appendChild(produceElement({
    type: 'i',
    class: ['fa-solid', 'fa-arrow-right']
  }));
  div.appendChild(a);
  article.appendChild(div);

  projectWrapper.appendChild(article);
}

function createPopup(element) {
  element.classList.add('test');
}

projectWrapper.addEventListener('click', e => {
  const { target } = e;

  if (target.tagName.toLowerCase() !== 'a' || !target.classList.contains('navy-button')) return

  createPopup(target.closest('article'));
});