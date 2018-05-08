import {Section} from "./Section";

export class Card {
  id: number;
  question: string;
  qAudio: File;
  qInfo: string;
  answer: string;
  aAudio: File;
  aInfo: string;
  cardImage: File;
  sectionId: number;
  section: Section = new Section();

  constructor(){ }
}
