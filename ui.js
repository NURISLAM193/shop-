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

// FAQ Accordion
document.querySelectorAll('[data-purpose="faq-section"] .rounded-xl').forEach(item => {
  const icon = item.querySelector('i');
  const existingAnswer = item.querySelector('p');

  // Оборачиваем ответ если он уже есть в HTML
  if (existingAnswer) {
    existingAnswer.style.overflow = 'hidden';
    existingAnswer.style.maxHeight = existingAnswer.scrollHeight + 'px';
    existingAnswer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease';
    existingAnswer.style.opacity = '1';
    existingAnswer.style.marginTop = '12px';
  }

  item.style.cursor = 'pointer';
  item.style.flexDirection = 'column';
  item.style.alignItems = 'stretch';
  item.style.display = 'flex';

  // Шапка вопроса
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';

  const titleEl = item.querySelector('span, h3');
  if (titleEl && icon) {
    header.appendChild(titleEl);
    header.appendChild(icon);
    item.insertBefore(header, item.firstChild);
  }

  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('faq-open');

    // Закрыть все открытые
    document.querySelectorAll('[data-purpose="faq-section"] .rounded-xl.faq-open').forEach(openItem => {
      openItem.classList.remove('faq-open');
      const p = openItem.querySelector('p.faq-answer');
      if (p) {
        p.style.maxHeight = '0';
        p.style.opacity = '0';
        p.style.marginTop = '0';
        setTimeout(() => p.remove(), 300);
      }
      const ic = openItem.querySelector('i');
      if (ic) { ic.classList.remove('fa-xmark'); ic.classList.add('fa-plus'); }
    });

    if (!isOpen) {
      item.classList.add('faq-open');
      if (icon) { icon.classList.remove('fa-plus'); icon.classList.add('fa-xmark'); }

      const answers = {
        'Can I modify my order after placing it?': 'Yes, you can modify your order within 1 hour of placing it. Please contact our support team immediately.',
        'How do I initiate a return?': 'Visit your order history, select the item, and click "Return". Our team will guide you through the process.',
        'How can I unsubscribe from the newsletter?': 'Click the "Unsubscribe" link at the bottom of any newsletter email, or update your preferences in account settings.',
        'Do you offer exchanges for products?': 'Yes! Exchanges are available within 30 days of purchase for items in original condition.',
        'How can I place an order on Klothink?': 'Ordering is easy! Simply browse our website, add items to your cart, and proceed to checkout. Follow the prompts to enter your details and complete your purchase.',
        'What payment methods do you accept?': 'We accept Visa, MasterCard, PayPal, Apple Pay, and Google Pay.',
        'How can I track my order?': 'Once shipped, you\'ll receive a tracking link via email. You can also check order status in your account.',
        'What is your shipping policy?': 'We offer free shipping on orders over $50. Standard delivery takes 3–5 business days.',
        'Are there any additional fees for returns?': 'No, returns are completely free within the 30-day window.',
        'How do I create an account on Klothink?': 'Click "Sign Up" in the top navigation, fill in your details, and you\'re all set!',
        'Can I change my account information?': 'Yes, go to Account Settings to update your name, email, address, or password anytime.',
        'Are my personal details secure on Klothink?': 'Absolutely. We use industry-standard SSL encryption and never share your data with third parties.',
      };

      const title = titleEl ? titleEl.textContent.trim() : '';
      const answerText = answers[title] || 'Please contact our support team for more information.';

      const p = document.createElement('p');
      p.className = 'faq-answer text-xs leading-relaxed';
      p.style.color = '#4B5563';
      p.style.overflow = 'hidden';
      p.style.maxHeight = '0';
      p.style.opacity = '0';
      p.style.marginTop = '0';
      p.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease';
      p.textContent = answerText;
      item.appendChild(p);

      // Запускаем анимацию в следующем кадре
      requestAnimationFrame(() => {
        p.style.maxHeight = p.scrollHeight + 'px';
        p.style.opacity = '1';
        p.style.marginTop = '12px';
      });
    }
  });
});