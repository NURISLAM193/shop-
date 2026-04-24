const heroSlides = [
  {
    badge: "Best Seller",
    image: "./images/c4510a7f30bfac968bd533c80e6258f53e496b9b.png",
    alt: "Yellow Casual Jacket",
    tags: ["Hoodie", "Casual Jacket", "Full Sleeve"],
  },
  {
    badge: "New Arrival",
    image: "./images/bd7b653987791f165cce045ab34f37a37b0b3a8d.png",
    alt: "Urban Street Jacket",
    tags: ["Streetwear", "Urban Fit", "Soft Lining"],
  },
  {
    badge: "Editor's Pick",
    image: "./images/30c9f2bd350702f764639aee18834154a078af82.png",
    alt: "Silk Evening Dress",
    tags: ["Silk", "Party Look", "Premium Feel"],
  },
];

const state = {
  heroIndex: 0,
  productStep: 0,
};

const refs = {
  menuButton: document.querySelector("#mobile-menu-button"),
  mobileMenu: document.querySelector("#mobile-menu"),
  mobileLinks: [...document.querySelectorAll("#mobile-menu a")],
  heroPrev: document.querySelector("#hero-prev"),
  heroNext: document.querySelector("#hero-next"),
  heroBadge: document.querySelector("#hero-badge"),
  heroImage: document.querySelector("#hero-image"),
  heroTag1: document.querySelector("#hero-tag-1"),
  heroTag2: document.querySelector("#hero-tag-2"),
  heroTag3: document.querySelector("#hero-tag-3"),
  categoryTabs: [...document.querySelectorAll("[data-category-filter]")],
  styleTabs: [...document.querySelectorAll("[data-style-filter]")],
  productGrid: document.querySelector("#product-grid"),
  pagePrev: document.querySelector("#page-prev"),
  pageNext: document.querySelector("#page-next"),
  pageProgress: document.querySelector("#page-progress"),
  sizeChips: [...document.querySelectorAll(".size-chip")],
  colorDots: [...document.querySelectorAll(".color-dot")],
};

function setupMenu() {
  if (!refs.menuButton || !refs.mobileMenu) return;

  refs.menuButton.addEventListener("click", () => {
    const isExpanded = refs.menuButton.getAttribute("aria-expanded") === "true";
    refs.menuButton.setAttribute("aria-expanded", String(!isExpanded));
    refs.mobileMenu.classList.toggle("hidden", isExpanded);
  });

  refs.mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      refs.mobileMenu.classList.add("hidden");
      refs.menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

function renderHero() {
  const slide = heroSlides[state.heroIndex];
  if (!slide || !refs.heroImage) return;

  refs.heroBadge.textContent = slide.badge;
  refs.heroImage.src = slide.image;
  refs.heroImage.alt = slide.alt;
  refs.heroTag1.textContent = slide.tags[0];
  refs.heroTag2.textContent = slide.tags[1];
  refs.heroTag3.lastChild.textContent = ` ${slide.tags[2]}`;
}

function setupHero() {
  if (!refs.heroPrev || !refs.heroNext) return;

  refs.heroPrev.addEventListener("click", () => {
    state.heroIndex = (state.heroIndex - 1 + heroSlides.length) % heroSlides.length;
    renderHero();
  });

  refs.heroNext.addEventListener("click", () => {
    state.heroIndex = (state.heroIndex + 1) % heroSlides.length;
    renderHero();
  });
}

function setActiveClass(nodes, currentNode, activeClass) {
  nodes.forEach((node) => {
    node.classList.toggle(activeClass, node === currentNode);
  });
}

function setupTabs() {
  refs.categoryTabs.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveClass(refs.categoryTabs, button, "tab-active");
    });
  });

  refs.styleTabs.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveClass(refs.styleTabs, button, "chip-active");
    });
  });
}

function rotateProducts(direction) {
  if (!refs.productGrid) return;
  const cards = [...refs.productGrid.children];
  if (cards.length <= 1) return;

  if (direction === "next") {
    refs.productGrid.appendChild(cards[0]);
    state.productStep = (state.productStep + 1) % 3;
  } else {
    refs.productGrid.prepend(cards[cards.length - 1]);
    state.productStep = (state.productStep - 1 + 3) % 3;
  }

  if (refs.pageProgress) {
    refs.pageProgress.style.width = `${(state.productStep + 1) * 33.333}%`;
  }
}

function setupPagination() {
  if (!refs.pagePrev || !refs.pageNext) return;

  refs.pagePrev.addEventListener("click", () => rotateProducts("prev"));
  refs.pageNext.addEventListener("click", () => rotateProducts("next"));
}

function setupHeroSelectors() {
  refs.sizeChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      setActiveClass(refs.sizeChips, chip, "size-chip-active");
    });
  });

  refs.colorDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setActiveClass(refs.colorDots, dot, "color-dot-active");
    });
  });
}

function setupResponsiveReset() {
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && refs.mobileMenu && refs.menuButton) {
      refs.mobileMenu.classList.add("hidden");
      refs.menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

function init() {
  setupMenu();
  setupHero();
  setupTabs();
  setupPagination();
  setupHeroSelectors();
  setupResponsiveReset();
  renderHero();
}

document.addEventListener("DOMContentLoaded", init);
