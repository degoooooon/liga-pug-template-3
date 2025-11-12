const toggleButton = document.querySelector('.main-nav__toggle');
const nav = document.querySelector('.main-nav');
const logoMobile = document.querySelector('.header__logo-mobile');
const body = document.body;

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');

    // переключаем цвет логотипа
    if (logoMobile) {
      logoMobile.classList.toggle('is-active', isOpen);
    }

    // блокируем/разблокируем прокрутку
    body.classList.toggle('scroll-lock-ios', isOpen);
  });
}

document.addEventListener('click', (event) => {
  const isClickInsideNav = nav.contains(event.target);
  const isClickOnToggle = toggleButton && toggleButton.contains(event.target);

  // Если меню открыто и клик вне меню и вне кнопки — закрываем
  if (nav.classList.contains('is-open') && !isClickInsideNav && !isClickOnToggle) {
    nav.classList.remove('is-open');
    if (logoMobile) {
      logoMobile.classList.remove('is-active');
    }
  }
});
