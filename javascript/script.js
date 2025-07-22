const logos = document.querySelectorAll('.animal-logo');
const title = document.getElementById('main-title');
let currentPlaying = null;
let bgm = null;

logos.forEach(logo => {
  logo.addEventListener('click', () => {
    const animal = logo.dataset.animal;

    // 🔁 もう1回同じロゴを押したら元に戻す
    if (currentPlaying === animal) {
      logo.src = `images/${animal}_awake.png`;
      logo.classList.remove('shake'); // アニメーション解除
      title.src = 'images/logo_title_awake.png';
      document.body.style.backgroundImage = "url('images/background_day.png')";

      if (bgm) {
        bgm.pause();
        bgm.currentTime = 0;
        bgm = null;
      }

      // 全ロゴの不透明度を戻す＆アニメーションも外す
      logos.forEach(l => {
        l.classList.remove('dimmed');
        l.classList.remove('shake');
      });

      currentPlaying = null;
      return;
    }

    // 他ロゴを暗く＆揺れ解除
    logos.forEach(l => {
      if (l !== logo) {
        l.classList.add('dimmed');
        l.classList.remove('shake');
      } else {
        l.classList.remove('dimmed');
      }
    });

    // 前回のロゴ戻す（画像）
    if (currentPlaying) {
      const prevLogo = document.querySelector(`[data-animal="${currentPlaying}"]`);
      if (prevLogo) {
        prevLogo.src = `images/${currentPlaying}_awake.png`;
        prevLogo.classList.remove('shake');
      }
    }

    // 今回のロゴを寝てる画像に変更＋揺らす
    logo.src = `images/${animal}_sleep.png`;
    logo.classList.add('shake');
    title.src = 'images/logo_title_sleep.png';
    document.body.style.backgroundImage = "url('images/background_night.png')";

    // 音楽の再生
    bgm = new Audio(`bgm/${animal}_bgm.mp3`);
    bgm.loop = true;
    bgm.play();

    currentPlaying = animal;
  });
});
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('open');
});

