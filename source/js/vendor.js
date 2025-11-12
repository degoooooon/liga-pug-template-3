// Swiper 8.4.7
import './vendor/swiper';
import './vendor/focus-visible-polyfill';
import './modules/filter/filter';
import './modules/range/range';
import './modules/menu/menu';

const parallaxZone = document.querySelector('.about');
const content = document.querySelector('.about__img');

function handleParallax(e) {
  const x = e.pageX / window.innerWidth;
  const y = e.pageY / window.innerHeight;

  if (content) {
    content.style.transform = `translate(${x * 50}px, -${y * 50}px)`;
  }
}

// ✅ Добавляем обработчик только если ширина ≥ 1280
if (window.innerWidth >= 1280 && parallaxZone) {
  parallaxZone.addEventListener('mousemove', handleParallax);
}

function resizeSlides(swiperInstance) {
  swiperInstance.slides.forEach(slide => {
    slide.style.transform = 'scale(1)';
    slide.style.transition = 'height 0.3s ease, opacity 0.3s ease';
  });

  const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
  activeSlide.style.transform = 'scale(1.02)';
}


const swiper = new Swiper('.countries__slider', {
  direction: 'vertical',
  slidesPerView: 3,
  spaceBetween: 10,
  centeredSlides: true,
  loop: true,
  initialSlide: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  simulateTouch: true,
  grabCursor: true,
  mousewheel: true,
  speed: 500,
  on: {
    init(swiperInstance) {
      resizeSlides(swiperInstance);
    },
    slideChangeTransitionEnd(swiperInstance) {
      resizeSlides(swiperInstance);
    },
  },
  breakpoints: {
    0: {
      slidesPerView: '3',
      allowTouchMove: false,
      autoplay: false,
      centeredSlides: false,
      loop: false,
      spaceBetween: 9,
    },
    768: {
      slidesPerView: 3,
      centeredSlides: true,
      loop: true,
      allowTouchMove: true,
    },
  },
});
