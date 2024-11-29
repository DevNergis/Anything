const menu = document.getElementById("menu");
const bestScore = document.getElementById("menu_best_score");
const nowScoreM = document.getElementById("menu_now_score");
const nowScore = document.getElementById("now_score");
const nowTime = document.getElementById("now_time");
const playButton = document.getElementById("play_button");
const gameButton = document.getElementById("in_game_button");

let ready = 3;

function startGame() {
    menu.classList.add("playing_game");
    playButton.disabled = true;
}
