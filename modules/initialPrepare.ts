import { IPerpare } from "../interfaces/iprepare.interface";

export let initPrepare: IPerpare = {};

initPrepare.cards = [];
initPrepare.progress = 0;
initPrepare.fullTrackAudio = new Audio("../assets/audio/fulltrack.mp3");
initPrepare.failAudio = new Audio("../assets/audio/fail.mp3");
initPrepare.flipAudio = new Audio("../assets/audio/flip.mp3");
initPrepare.goodAudio = new Audio("../assets/audio/good.mp3");
initPrepare.gameOverAudio = new Audio("../assets/audio/game-over.mp3");

initPrepare.fullTrackAudio.loop = true;

export const NoOfCards = 20;

export let tempNumbers = [];
