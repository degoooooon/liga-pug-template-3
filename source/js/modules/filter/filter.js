document.addEventListener('DOMContentLoaded', () => {
  // 🔹 Основной фильтр
  const toggleBtn = document.querySelector('.filter__toggle');
  const closeBtn = document.querySelector('.filter__button');
  const filterBlock = document.querySelector('.filter__container');
  const continents = document.querySelector('.filter__continents');
  const originalParent = document.querySelector('.filter__wrap');
  const toggleText = toggleBtn?.querySelector('.filter__toggle-text');

  // Открытие/закрытие фильтра
  if (toggleBtn && filterBlock) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = filterBlock.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      toggleBtn.classList.toggle('filter__open', !isOpen);
      toggleBtn.classList.toggle('filter__close', isOpen);
      updateToggleText(isOpen);
    });
  }

  // Закрытие фильтра по кнопке
  if (closeBtn && filterBlock && toggleBtn) {
    closeBtn.addEventListener('click', () => {
      filterBlock.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('filter__close');
      toggleBtn.classList.add('filter__open');
      updateToggleText(false);
    });
  }

  // Обновление текста кнопки
  function updateToggleText(isOpen) {
    if (!toggleText || !filterBlock) return;
    const width = window.innerWidth;
    toggleText.textContent =
      width >= 1280 || width < 768
        ? 'Фильтрация по странам:'
        : isOpen ? 'Свернуть' : 'Показать все';
  }

  // Перемещение блоков на мобильных
  function moveContinentsIfMobile() {
    const width = window.innerWidth;
    if (continents && filterBlock && originalParent) {
      if (width < 768 && !filterBlock.contains(continents)) {
        filterBlock.appendChild(continents);
      } else if (width >= 768 && !originalParent.contains(continents)) {
        originalParent.appendChild(continents);
      }
    }
  }

  // 🔹 Переключение стран по буквам
  const letterButtons = document.querySelectorAll('.filter__letter-btn');
  const lettersBlock = document.querySelector('.filter__list');
  const activeContainer = document.createElement('div');
  activeContainer.classList.add('filter__active-list');

  function renderLetter(letter) {
    const originalList = document.querySelector(`.filter__list-countries[data-letter="${letter}"]`);
    if (!originalList) return;
    activeContainer.innerHTML = '';
    const clone = originalList.cloneNode(true);
    clone.style.display = 'block';
    activeContainer.appendChild(clone);
    letterButtons.forEach(btn => btn.classList.remove('is-active'));
    const activeBtn = document.querySelector(`.filter__letter-btn[data-letter="${letter}"]`);
    if (activeBtn) activeBtn.classList.add('is-active');
  }

  function initLetterFilter() {
    if (!lettersBlock) return;
    if (window.innerWidth < 1280) {
      if (!activeContainer.parentNode) {
        lettersBlock.insertAdjacentElement('afterend', activeContainer);
      }
      letterButtons.forEach(btn => {
        btn.onclick = () => renderLetter(btn.dataset.letter);
      });
      const firstBtn = document.querySelector('.filter__letter-btn');
      if (firstBtn) renderLetter(firstBtn.dataset.letter);
    } else {
      if (activeContainer.parentNode) activeContainer.remove();
      letterButtons.forEach(btn => {
        btn.onclick = null;
        btn.classList.remove('is-active');
      });
      document.querySelectorAll('.filter__list-countries').forEach(list => {
        list.style.display = '';
      });
    }
  }

  // 🔹 Инициализация при загрузке и ресайзе
  moveContinentsIfMobile();
  updateToggleText(filterBlock?.classList.contains('is-open'));
  initLetterFilter();

  window.addEventListener('resize', () => {
    moveContinentsIfMobile();
    updateToggleText(filterBlock?.classList.contains('is-open'));
    initLetterFilter();
  });
});

const toggles = document.querySelectorAll('.puputchik-filter__toggle');
const contents = document.querySelectorAll('.puputchik-filter__content');

// 🔹 Инициализация: выставить max-height для открытых блоков
contents.forEach(content => {
  if (content.classList.contains('is-open')) {
    content.style.maxHeight = content.scrollHeight + 'px';
  }
});

// 🔹 Переключение при клике
toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const content = toggle.nextElementSibling;
    const isOpen = content.classList.contains('is-open');

    toggle.classList.toggle('is-open');

    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px'; // нужно для плавного закрытия
      requestAnimationFrame(() => {
        content.style.maxHeight = '0';
        content.classList.remove('is-open');
      });
    } else {
      content.classList.add('is-open');
      content.style.maxHeight = content.scrollHeight + 'px';

      content.addEventListener('transitionend', function handler() {
        content.style.maxHeight = 'none'; // сброс для адаптивности
        content.removeEventListener('transitionend', handler);
      });
    }
  });
});

// 🔹 Обработка ресайза
window.addEventListener('resize', () => {
  contents.forEach(content => {
    if (content.classList.contains('is-open')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});
