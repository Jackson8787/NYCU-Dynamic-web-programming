// js/popup.js
(function () {
  const overlay  = document.getElementById('overlay');
  const autoPop  = document.getElementById('popupAuto');
  const btnPop   = document.getElementById('popupBtn');
  const btnShow  = document.getElementById('btnShowPopup');

  function openModal(id) {
    overlay.classList.remove('hidden');              // 背景變暗
    document.getElementById(id).classList.remove('hidden');
  }
  function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    // 若兩個彈窗都關閉，再把遮罩關掉
    const allClosed = autoPop.classList.contains('hidden') && btnPop.classList.contains('hidden');
    if (allClosed) overlay.classList.add('hidden');
  }

  // 頁面載入後自動顯示（不可滾動的那個）
  window.addEventListener('load', () => {
    openModal('popupAuto');
  });

  // 按鈕觸發顯示（可滾動的那個）
  btnShow?.addEventListener('click', () => openModal('popupBtn'));

  // 關閉按鈕（用 data-close 指到目標）
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t.matches('.close[data-close]')) {
      closeModal(t.getAttribute('data-close'));
    }
  });

  // 點遮罩也可關閉
  overlay.addEventListener('click', () => {
    autoPop.classList.add('hidden');
    btnPop.classList.add('hidden');
    overlay.classList.add('hidden');
  });
})();
