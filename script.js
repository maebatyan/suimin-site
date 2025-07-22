const logos = document.querySelectorAll('.animal-logo');
const title = document.getElementById('main-title');
let currentPlaying = null;
let bgm = null;

logos.forEach(logo => {
  logo.addEventListener('click', () => {
    const animal = logo.dataset.animal;

    if (currentPlaying === animal) {
      logo.src = `images/${animal}_awake.png`;
      title.src = 'images/logo_title_awake.png';
      document.body.style.backgroundImage = "url('images/background_day.png')";
      bgm.pause();
      bgm.currentTime = 0;
      currentPlaying = null;
      return;
    }

    if (bgm) {
      const prevLogo = document.querySelector(`[data-animal="${currentPlaying}"]`);
      prevLogo.src = `images/${currentPlaying}_awake.png`;
      bgm.pause();
      bgm.currentTime = 0;
    }

    logo.src = `images/${animal}_sleep.png`;
    title.src = 'images/logo_title_sleep.png';
    document.body.style.backgroundImage = "url('images/background_night.png')";
    bgm = new Audio(`bgm/${animal}_bgm.mp3`);
    bgm.loop = true;
    bgm.play();
    currentPlaying = animal;
  });
})
