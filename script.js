const logos = document.querySelectorAll('.animal-logo');
const title = document.getElementById('main-title');
let currentPlaying = null;
let bgm = null;

logos.forEach(logo => {
  logo.addEventListener('click', () => {
    const animal = logo.dataset.animal;

    // 同じロゴをもう一度押したとき → 停止処理
    if (currentPlaying === animal) {
      logo.src = `images/${animal}_awake.png`;
      title.src = 'images/logo_title_awake.png';
      document.body.style.backgroundImage = "url('images/background_day.png')";
      logo.classList.remove('shake');
      logos.forEach(other => {
        other.classList.remove('dimmed');
      });
      if (bgm) {
        bgm.pause();
        bgm.currentTime = 0;
        bgm = null; // ←これが重要！これで次の再生ができるようになる
      }
      currentPlaying = null;
      return;
    }

    // 前のBGMがあれば止める
    if (bgm) {
      const prevLogo = document.querySelector(`[data-animal="${currentPlaying}"]`);
      prevLogo.src = `images/${currentPlaying}_awake.png`;
      prevLogo.classList.remove('shake');
      bgm.pause();
      bgm.currentTime = 0;
    }

    // ロゴ変更・タイトル変更・背景変更
    logo.src = `images/${animal}_sleep.png`;
    title.src = 'images/logo_title_sleep.png';
    document.body.style.backgroundImage = "url('images/background_night.png')";

    // 揺れるアニメーションを付ける
    logos.forEach(other => {
      if (other !== logo) {
        other.classList.add('dimmed');
        other.classList.remove('shake');
      } else {
        other.classList.remove('dimmed');
        other.classList.add('shake');
      }
    });

    // 音楽再生
    bgm = new Audio(`bgm/${animal}_bgm.mp3`);
    bgm.loop = true;
    bgm.play();
    currentPlaying = animal;
  });
});
