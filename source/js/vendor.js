/* global Swiper */

import './vendor/swiper';
import './vendor/focus-visible-polyfill';
import './modules/filter/filter';
import './modules/range/range';
import './modules/menu/menu';

function resizeSlides(swiperInstance) {
  swiperInstance.slides.forEach((slide) => {
    slide.style.transform = 'scale(1)';
    slide.style.transition = 'height 0.3s ease, opacity 0.3s ease';
  });

  const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
  if (activeSlide) {
    activeSlide.style.transform = 'scale(1.02)';
  }
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
      slidesPerView: 3,
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

swiper.slideNext();
