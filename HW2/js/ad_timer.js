// js/ad_timer.js
(function () {
  const ad      = document.getElementById('adBox');
  const close   = document.getElementById('adClose');
  const timerEl = document.getElementById('timer');

  const t0 = performance.now(); // 更精準
  let timerId = null;

  function formatTime(ms) {
    const total = ms / 1000;
    const int   = Math.floor(total);           // 整數秒
    const dec   = Math.floor((total - int) * 10); // 一位小數
    return String(int).padStart(4, '0') + '.' + dec + 's';
  }

  function startTimer() {
    timerId = setInterval(() => {
      const elapsed = performance.now() - t0;
      timerEl.textContent = formatTime(elapsed);
    }, 100); // 每 0.1 秒更新
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      ad.classList.remove('hidden'); // 載入 3 秒後顯示
      startTimer();
    }, 3000);
  });

  close.addEventListener('click', () => {
    ad.classList.add('hidden');
    if (timerId) clearInterval(timerId);
  });
})();
