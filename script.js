let list = [
  {
    src: "/music/around-me.m4a",
    name: "Around me",
    artist: "Metro booming, Don Toliver",
  },
  {
    src: "/music/streatham.mp3",
    name: "Streatham",
    artist: "Santan Dave",
  },
  {
    src: "/music/h-attack.mp3",
    name: "Heart Attack",
    artist: "Dave",
  },
  {
    src: "/music/Billie_Eilish_-_Happier_Than_Ever_(Jesusful.com).mp3",
    name: "Happier_Than_Ever",
    artist: "Billie Eilish",
  },
  {
    src: "/music/Gunna_-_Fukumean.mp3",
    name: "Fukumean",
    artist: "Gunna",
  },
  {
    src: "/music/Yung_Leann_-_Ginseng_Strip.mp3",
    name: "Ginseng Strip",
    artist: "Yung Leann",
  },
  {
    src: "/music/Lil_Nas_X_-_MONTERO_Call_Me_By_Your_Name__(Naijay.com)_062440.mp3",
    name: "Lil-Nas_x",
    artist: "Montero",
  },
  {
    src: "/music/Lil_Baby_Drip_Too_Hard_(thinkNews.com.ng).mp3",
    name: "Lil Baby",
    artist: "Drip too hard",
  },
  {
    src: "/music/Joeboy_-_Alcohol.mp3",
    name: "Joeboy",
    artist: "Alcohol",
  },
];
var index = 0;
let inPlay = false;
let myduration = "0:0";

function duration() {
  let minutes = Math.floor(audio.duration / 60);
  let seconds = Math.floor(audio.duration % 60);
  return `${minutes}:${seconds}`;
}
function play() {
  audio.play();
  inPlay = true;
  dIcon.src = "./images/pause_24dp_000000_FILL0_wght400_GRAD0_opsz24.png";
}
function pause() {
  audio.pause();
  inPlay = false;
  dIcon.src = "./images/play_arrow_24dp_000000_FILL0_wght400_GRAD0_opsz24.png";
}
function togglePlay() {
  !inPlay ? play() : pause();
}
function next() {
  if (index < list.length - 1) {
    index = index + 1;
    audio.src = list[index].src;
    songTitle.innerText = list[index].name;
    songArtist.innerText = list[index].artist;
    duration();
    audio.play();
  }
}
function prev() {
  if (index > 0) {
    index = index - 1;
    audio.src = list[index].src;
    songTitle.innerText = list[index].name;
    songArtist.innerText = list[index].artist;
    duration();
    audio.play();
  }
}
const audio = document.getElementById("audio");
const playButton = document.getElementById("contr-btn2");
const nextButton = document.getElementById("contr-btn3");
const prevButton = document.getElementById("contr-btn1");
const musicList = document.querySelector(".music-list");
const mobileList = document.querySelector(".mobile-list");
const progressBar = document.getElementById("progress");

playButton.addEventListener("click", togglePlay);
nextButton.addEventListener("click", next);
prevButton.addEventListener("click", prev);

list.forEach((song, i) => {
  const li = document.createElement("li");
  li.className = "songListItem";
  li.textContent = song.name + " : " + song.artist;
  musicList.appendChild(li);
  li.addEventListener("click", () => {
    index = i;
    audio.src = list[i].src;
    songTitle.innerText = list[index].name;
    songArtist.innerText = list[index].artist;
    play();
  });
});
list.forEach((item, i) => {
  const li = document.createElement("li");
  li.textContent = item.name + " : " + item.artist;
  mobileList.appendChild(li);
  li.className = "songListItem";
  li.addEventListener("click", () => {
    index = i;
    audio.src = list[i].src;
    songTitle.innerText = list[index].name;
    songArtist.innerText = list[index].artist;
    play();
  });
});

audio.addEventListener("loadedmetadata", (e) => {
  myduration = duration();
  console.log(myduration);
  songDuration.innerText = myduration;
  progressBar.max = Math.floor(audio.duration);
  console.log(progressBar.max);
});
audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  songTime.innerText = `${Math.floor(audio.currentTime / 60)}:${Math.floor(
    audio.currentTime % 60
  )}`;
  if (progressBar.value == Math.floor(audio.duration)) {
    index = index + 1;
    audio.src = list[index].src;
    songTitle.innerText = list[index].name;
    songArtist.innerText = list[index].artist;
    audio.play();
  }
});
progressBar.addEventListener("change", (e) => {
  console.log(e.target.value);
});
progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
  if (progressBar.value == Math.floor(audio.duration - 1)) {
    index = index + 1;
    audio.src = list[index].src;
    songTitle.innerText = list[index].name;
    songArtist.innerText = list[index].artist;
    audio.play();
  }
});

//assigning fxns
let songTitle = document.getElementById("song-title");
let songArtist = document.getElementById("song-artist");
let songDuration = document.getElementById("duration");
let songTime = document.getElementById("current-time");
const dIcon = document.getElementById("d-icon");
audio.src = list[index].src;

//cancel button
const cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", () => {
  mobileList.style.display = "none";
});

//menuBtn
const menuBtn = document.getElementById("menu-btn");
menuBtn.addEventListener("click", () => {
  mobileList.style.display = "flex";
});

songTitle.innerText = list[index].name;
songArtist.innerText = list[index].artist;
songDuration.innerText = myduration;
