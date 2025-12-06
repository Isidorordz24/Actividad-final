const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressBar = document.getElementById('progress-bar');
const bg = document.getElementById('bg');
const cover = document.getElementById('cover');
const videoBg = document.getElementById('video-bg');

let playing = false;
let audio = new Audio();
let current = 0;

const songs = [
  {
    title: 'Tu Boda',
    artist: 'Oscar Maydon, Fuerza Regida',
    cover: 'imgs/tu boda.png',
    file: 'Songs/Tu Boda.mp3',
    video: 'videos/tu-boda.mp4'
  },
  {
    title: 'La Ciudad del Sol',
    artist: 'Oscar Maydon, Omar Camacho',
    cover: 'imgs/la ciudad del sol.png',
    file: 'Songs/La Ciudad del Sol.mp3',
    video: 'videos/la-ciudad-del-sol.mp4'
  },
  {
    title: 'Nací para Amarte',
    artist: 'Junior H',
    cover: 'imgs/Mi vida.png',
    file: 'Songs/Naci para Amarte.mp3',
    video: 'videos/naci-para-amarte.mp4'
  }
];

function updateSong() {
  const song = songs[current];
  document.getElementById('title').textContent = song.title;
  document.getElementById('artist').textContent = song.artist;
  cover.src = song.cover;
  bg.style.backgroundImage = `url(${song.cover})`;
  audio.src = song.file;

  if (song.video) {
    videoBg.src = song.video;
    videoBg.style.opacity = 1;
  } else {
    videoBg.style.opacity = 0;
  }

  if (playing) audio.play();
}

function togglePlay() {
  if (!playing) {
    audio.play();
    playBtn.classList.replace('ri-play-circle-fill', 'ri-pause-circle-fill');
    playing = true;
  } else {
    audio.pause();
    playBtn.classList.replace('ri-pause-circle-fill', 'ri-play-circle-fill');
    playing = false;
  }
}

function nextSong() {
  current = (current + 1) % songs.length;
  updateSong();
}

function prevSong() {
  current = (current - 1 + songs.length) % songs.length;
  updateSong();
}

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + '%';
});

audio.addEventListener('ended', () => {
  nextSong();
});

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

updateSong();
