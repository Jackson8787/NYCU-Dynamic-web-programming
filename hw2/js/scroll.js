// === Scroll-triggered typewriter for the story ===
(function () {
  const container = document.getElementById('scroll-story');
  const textEl = document.getElementById('storyText');
  if (!container || !textEl) return;

  const STORY =
    '有一天我喝醉了大聲喊「我要娶兎田ぺこら！我要當宇宙巨兔的男人！」 . . . . . . <br>' +
    '這時我老婆皺了皺眉，溫柔的給我蓋好被子，然後親了我一口又湊到我耳邊說<br>' +
    '「嫁給你一次了，還想要我嫁給你第二次？」';

  let started = false;

  function nextDelay(ch) {
    if ('，、）)」』'.includes(ch)) return 260;
    if ('。！？!?'.includes(ch)) return 320;
    if (ch === '.') return 120; // . . . . . .
    return 32 + Math.random() * 28; // 32~60ms
  }

  function typewriter(i = 0) {
    if (i > STORY.length) {
      // 打完字後游標繼續閃爍，不做其他事
      return;
    }
    textEl.innerHTML = STORY.slice(0, i);
    const ch = STORY[i - 1] || '';
    setTimeout(() => typewriter(i + 1), nextDelay(ch));
  }

  // 專門觀察 scroll-story（故事）→啟動打字
  const ioStory = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting && !started) {
        started = true;
        typewriter(1);
        ioStory.unobserve(container);
      }
    });
  }, { threshold: 0.2 });

  ioStory.observe(container);

  // === 共用 IntersectionObserver（方法一）===
  // 讓所有 .reveal 元素都能在滾動時自動加上 .visible
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const ioReveal = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        ioReveal.unobserve(en.target); // 觸發一次後就停止觀察
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => ioReveal.observe(el));
})();
