import { ICard } from "../interfaces/icard.interface.js";
import * as P from "../modules/initialPrepare.js";
import { presentationFun } from "../modules/presentation.js";

function getRandomNumber(min: number, max: number): number {
  let result: number = 0;
  let IsExist = true;

  while (IsExist) {
    result = Math.floor(Math.random() * (max - min + 1) + min);
    if (P.tempNumbers.find((no) => no === result)) {
      IsExist = true;
    } else {
      IsExist = false;
      P.tempNumbers.push(result);
    }
  }
  return result;
}

function flip(card: ICard, index: number) {
  P.initPrepare.flipAudio.play();

  if (card) {
    card.flip = card.flip === "" ? "flip" : "";
    document.getElementById(`card-flip-${index}`).classList.value = card.flip;
  }
}

function selectedCard(card: ICard, index: number) {
  if (!P.initPrepare.selectedCard_1) {
    P.initPrepare.selectedCard_1 = card;
    P.initPrepare.selectedIndex_1 = index;
  } else if (!P.initPrepare.selectedCard_2) {
    P.initPrepare.selectedCard_2 = card;
    P.initPrepare.selectedIndex_2 = index;
  }
  if (P.initPrepare.selectedCard_1 && P.initPrepare.selectedCard_2) {
    if (P.initPrepare.selectedCard_1.src === P.initPrepare.selectedCard_2.src) {
      P.initPrepare.selectedCard_1.clickable = false;
      P.initPrepare.selectedCard_2.clickable = false;
      P.initPrepare.selectedCard_1 = null;
      P.initPrepare.selectedCard_2 = null;
      stopAudio(P.initPrepare.failAudio);
      stopAudio(P.initPrepare.goodAudio);
      P.initPrepare.goodAudio.play();
      updateProgress();
      checkFinish();
    } else {
      setTimeout(() => {
        stopAudio(P.initPrepare.failAudio);
        stopAudio(P.initPrepare.goodAudio);
        P.initPrepare.failAudio.play();
        flip(P.initPrepare.selectedCard_1, P.initPrepare.selectedIndex_1);
        flip(P.initPrepare.selectedCard_2, P.initPrepare.selectedIndex_2);
        P.initPrepare.selectedCard_1 = null;
        P.initPrepare.selectedCard_2 = null;
      }, 1000);
    }
  }
}

function updateProgress() {
  let progress = P.initPrepare.cards.filter((card) => !card.clickable).length;
  progress = (progress / P.NoOfCards) * 100;
  const progressElement = document.getElementById("progress");
  progressElement.style.width = `${progress}%`;
  progressElement.innerHTML = `${progress}%`;
}

function checkFinish() {
  if (
    P.initPrepare.cards.filter((card) => !card.clickable).length === P.NoOfCards
  ) {
    stopAudio(P.initPrepare.fullTrackAudio);
    stopAudio(P.initPrepare.failAudio);
    stopAudio(P.initPrepare.goodAudio);
    P.initPrepare.gameOverAudio.play();
  }
}

function stopAudio(audio: HTMLAudioElement) {
  if (audio && audio.played) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function toggleFlip(index: number) {
  P.initPrepare.fullTrackAudio.play();

  let card = P.initPrepare.cards[index];

  if (!card.flip && card.clickable) {
    flip(card, index);
    selectedCard(card, index);
  }
}

for (let i = 0; i < P.NoOfCards / 2; i++) {
  P.initPrepare.cards.push({
    id: getRandomNumber(0, P.NoOfCards),
    src: `../assets/images/${i}.jpg`,
    flip: "",
    clickable: true,
    index: i,
  });
  P.initPrepare.cards.push({
    id: getRandomNumber(0, P.NoOfCards),
    src: `../assets/images/${i}.jpg`,
    flip: "",
    clickable: true,
    index: i,
  });
}

P.initPrepare.cards.sort((a, b) => (a.id > b.id ? 1 : -1));

P.initPrepare.cards.forEach((card, index) => presentationFun(card, index));

document.querySelectorAll("#toggle-card").forEach((element, index) => {
  element.addEventListener("click", () => {
    toggleFlip(index);
  });
});
