import { IAudio } from "./iaudio.interface";
import { ICard } from "./icard.interface";

export interface IPerpare extends IAudio {
  cards?: ICard[];
  selectedCard_1?: ICard;
  selectedCard_2?: ICard;
  selectedIndex_1?: number;
  selectedIndex_2?: number;
  progress?: number;
}
