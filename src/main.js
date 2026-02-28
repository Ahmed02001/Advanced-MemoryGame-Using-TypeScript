"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var P = require("../modules/initialPrepare.js");
var presentation_js_1 = require("../modules/presentation.js");
function getRandomNumber(min, max) {
    var result = 0;
    var IsExist = true;
    while (IsExist) {
        result = Math.floor(Math.random() * (max - min + 1) + min);
        if (P.tempNumbers.find(function (no) { return no === result; })) {
            IsExist = true;
        }
        else {
            IsExist = false;
            P.tempNumbers.push(result);
        }
    }
    return result;
}
function flip(card, index) {
    P.initPrepare.flipAudio.play();
    if (card) {
        card.flip = card.flip === "" ? "flip" : "";
        document.getElementById("card-flip-".concat(index)).classList.value = card.flip;
    }
}
function selectedCard(card, index) {
    if (!P.initPrepare.selectedCard_1) {
        P.initPrepare.selectedCard_1 = card;
        P.initPrepare.selectedIndex_1 = index;
    }
    else if (!P.initPrepare.selectedCard_2) {
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
        }
        else {
            setTimeout(function () {
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
    var progress = P.initPrepare.cards.filter(function (card) { return !card.clickable; }).length;
    progress = (progress / P.NoOfCards) * 100;
    var progressElement = document.getElementById("progress");
    progressElement.style.width = "".concat(progress, "%");
    progressElement.innerHTML = "".concat(progress, "%");
}
function checkFinish() {
    if (P.initPrepare.cards.filter(function (card) { return !card.clickable; }).length === P.NoOfCards) {
        stopAudio(P.initPrepare.fullTrackAudio);
        stopAudio(P.initPrepare.failAudio);
        stopAudio(P.initPrepare.goodAudio);
        P.initPrepare.gameOverAudio.play();
    }
}
function stopAudio(audio) {
    if (audio && audio.played) {
        audio.pause();
        audio.currentTime = 0;
    }
}
function toggleFlip(index) {
    P.initPrepare.fullTrackAudio.play();
    var card = P.initPrepare.cards[index];
    if (!card.flip && card.clickable) {
        flip(card, index);
        selectedCard(card, index);
    }
}
for (var i = 0; i < P.NoOfCards / 2; i++) {
    P.initPrepare.cards.push({
        id: getRandomNumber(0, P.NoOfCards),
        src: "../assets/images/".concat(i, ".jpg"),
        flip: "",
        clickable: true,
        index: i,
    });
    P.initPrepare.cards.push({
        id: getRandomNumber(0, P.NoOfCards),
        src: "../assets/images/".concat(i, ".jpg"),
        flip: "",
        clickable: true,
        index: i,
    });
}
P.initPrepare.cards.sort(function (a, b) { return (a.id > b.id ? 1 : -1); });
P.initPrepare.cards.forEach(function (card, index) { return (0, presentation_js_1.presentationFun)(card, index); });
document.querySelectorAll("#toggle-card").forEach(function (element, index) {
    element.addEventListener("click", function () {
        toggleFlip(index);
    });
});
