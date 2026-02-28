import { ICard } from "../interfaces/icard.interface";

export function presentationFun(card: ICard, index: number) {
  const span = document.createElement("span");
  span.className = " col-6 col-lg-2";

  const toggleCard = document.createElement("div");
  toggleCard.id = "toggle-card";
  toggleCard.className = "card-flip";

  const cardFlip = document.createElement("div");
  cardFlip.id = "card-flip-" + index;

  const front = document.createElement("div");
  front.className = "front";

  const frontCard = document.createElement("div");
  frontCard.className = "card";

  const frontImg = document.createElement("img");
  frontImg.className = "card-image";
  frontImg.src = "../assets/back.jpg";
  frontImg.alt = "loading....";

  const frontSpan = document.createElement("span");
  frontSpan.className = "card-content";
  frontSpan.textContent = String(index + 1);

  frontCard.appendChild(frontImg);
  frontCard.appendChild(frontSpan);
  front.appendChild(frontCard);

  const back = document.createElement("div");
  back.className = "back";

  const backCard = document.createElement("div");
  backCard.className = "card";

  const backImg = document.createElement("img");
  backImg.src = "../assets/images/" + card.index + ".jpg";
  backImg.alt = "image....";
  backImg.setAttribute("data-holder-rendered", "true");
  backImg.style.height = "120px";
  backImg.style.width = "100%";
  backImg.style.display = "block";

  backCard.appendChild(backImg);
  back.appendChild(backCard);

  cardFlip.appendChild(front);
  cardFlip.appendChild(back);
  toggleCard.appendChild(cardFlip);
  span.appendChild(toggleCard);
  document.getElementById("cards").appendChild(span);
}
