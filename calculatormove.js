const calculator = document.querySelector("#calculator");
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let halfW = 0;
let halfH = 0;

function setPositionByVisualCorner(visualLeft, visualTop) {
  // Clamp so calculator stays fully on-screen
 const maxLeft = window.innerWidth  - 2 * halfW;  // right edge at right border
 const maxTop  = window.innerHeight - 2 * halfH;  // bottom edge at bottom border

  // Clamp to [0, max] so the opposite edge can't go off-screen either
  const clampedLeft = Math.max(0, Math.min(visualLeft, maxLeft));
  const clampedTop  = Math.max(0, Math.min(visualTop,  maxTop));

  calculator.style.left = (clampedLeft + halfW) + 'px';
  calculator.style.top  = (clampedTop  + halfH) + 'px';

  // Always keep the transform — it's what makes the math work
  calculator.style.transform = 'translate(-50%, -50%)';
}

// --- Mouse ---
calculator.addEventListener('mousedown', (e) => {
  isDragging = true;
  e.preventDefault();

  const rect = calculator.getBoundingClientRect();
  halfW = rect.width / 2;
  halfH = rect.height / 2;

  setPositionByVisualCorner(rect.left, rect.top);

  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  document.addEventListener('mousemove', move);
});

// --- Touch ---
calculator.addEventListener('touchstart', (e) => {
  isDragging = true;

  const touch = e.touches[0];
  const rect  = calculator.getBoundingClientRect();
  halfW = rect.width / 2;
  halfH = rect.height / 2;

  setPositionByVisualCorner(rect.left, rect.top);

  offsetX = touch.clientX - rect.left;
  offsetY = touch.clientY - rect.top;

  document.addEventListener('touchmove', move, { passive: false });
}, { passive: false });

// --- Shared move handler ---
function move(e) {
  if (e.type === 'touchmove') {
    e.preventDefault();
  }

  const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

  const desiredVisualLeft = clientX - offsetX;
  const desiredVisualTop  = clientY - offsetY;

  setPositionByVisualCorner(desiredVisualLeft, desiredVisualTop);
}

// --- Release ---
function stopDrag() {
  isDragging = false;
  document.removeEventListener('mousemove', move);
  document.removeEventListener('touchmove', move);
}

document.addEventListener('mouseup', stopDrag);
document.addEventListener('touchend', stopDrag);