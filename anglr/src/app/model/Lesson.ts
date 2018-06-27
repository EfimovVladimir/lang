
import {Card} from "./Card";

export class Lesson {
  id: number;
  info: string;
  symbols: number;
  questionField: number;
  cards: Card[] = [];

  constructor(){ }
}
