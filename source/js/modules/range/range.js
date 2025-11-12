document.addEventListener('DOMContentLoaded', () => {
  const minInput = document.querySelector('.range__input--min');
  const maxInput = document.querySelector('.range__input--max');
  const bar = document.querySelector('.range__bar');
  const toggleMin = document.querySelector('.range__toggle--min');
  const toggleMax = document.querySelector('.range__toggle--max');
  const scale = document.querySelector('.range__scale');

  // Проверка на наличие всех элементов
  if (!minInput || !maxInput || !bar || !toggleMin || !toggleMax || !scale) {
    console.warn('Range-слайдер: необходимые элементы не найдены');
    return;
  }

  const minLimit = parseInt(minInput.min);
  const maxLimit = parseInt(maxInput.max);
  const minGap = 15;
  let activeToggle = null;

  function updateVisuals() {
    const scaleWidth = scale.offsetWidth;
    let minVal = parseInt(minInput.value);
    let maxVal = parseInt(maxInput.value);

    if (isNaN(minVal)) minVal = minLimit;
    if (isNaN(maxVal)) maxVal = maxLimit;

    if (maxVal - minVal < minGap) {
      if (activeToggle === toggleMin) {
        minVal = maxVal - minGap;
      } else {
        maxVal = minVal + minGap;
      }
    }

    minVal = Math.max(minLimit, Math.min(minVal, maxVal - minGap));
    maxVal = Math.min(maxLimit, Math.max(maxVal, minVal + minGap));

    minInput.value = minVal;
    maxInput.value = maxVal;

    const minPx = ((minVal - minLimit) / (maxLimit - minLimit)) * scaleWidth;
    const maxPx = ((maxVal - minLimit) / (maxLimit - minLimit)) * scaleWidth;

    bar.style.left = `${minPx}px`;
    bar.style.width = `${maxPx - minPx}px`;

    toggleMin.style.left = `${minPx - toggleMin.offsetWidth / 0}px`;
    toggleMax.style.left = `${maxPx - toggleMax.offsetWidth / 0}px`;
  }

  minInput.addEventListener('input', updateVisuals);
  maxInput.addEventListener('input', updateVisuals);

  function onMouseDown(e) {
    activeToggle = e.target;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    const scaleRect = scale.getBoundingClientRect();
    const x = e.clientX - scaleRect.left;
    const percent = Math.max(0, Math.min(x / scaleRect.width, 1));
    const value = Math.round(percent * (maxLimit - minLimit) + minLimit);

    if (activeToggle === toggleMin) {
      minInput.value = Math.min(value, parseInt(maxInput.value) - minGap);
    } else if (activeToggle === toggleMax) {
      maxInput.value = Math.max(value, parseInt(minInput.value) + minGap);
    }

    updateVisuals();
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    activeToggle = null;
  }

  toggleMin.addEventListener('mousedown', onMouseDown);
  toggleMax.addEventListener('mousedown', onMouseDown);

  function onTouchStart(e) {
    activeToggle = e.target;
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  }

  function onTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const scaleRect = scale.getBoundingClientRect();
    const x = touch.clientX - scaleRect.left;
    const percent = Math.max(0, Math.min(x / scaleRect.width, 1));
    const value = Math.round(percent * (maxLimit - minLimit) + minLimit);

    if (activeToggle === toggleMin) {
      minInput.value = Math.min(value, parseInt(maxInput.value) - minGap);
    } else if (activeToggle === toggleMax) {
      maxInput.value = Math.max(value, parseInt(minInput.value) + minGap);
    }

    updateVisuals();
  }

  function onTouchEnd() {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    activeToggle = null;
  }

  toggleMin.addEventListener('touchstart', onTouchStart, { passive: false });
  toggleMax.addEventListener('touchstart', onTouchStart, { passive: false });

  window.addEventListener('load', updateVisuals);
});
