
import {Card} from "./Card";

export class Lesson {
  id: number;
  info: string = "";
  symbols: number;
  questionField: number = 0;
  cards: Card[] = [];

  constructor(){ }
}
