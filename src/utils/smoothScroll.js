// src/utils/smoothScroll.js
export const smoothScrollTo = (targetId, containerId) => {
  const container = document.getElementById(containerId);
  const targetElement = document.getElementById(targetId);

  if (!container || !targetElement) {
    console.warn("Element do przewinięcia lub kontener nie został znaleziony.");
    return;
  }

  const targetPosition = targetElement.offsetTop;
  const startPosition = container.scrollTop;
  const distance = targetPosition - startPosition;
  let startTime = null;
  const duration = 800; // Czas trwania animacji w ms

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    container.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
};
