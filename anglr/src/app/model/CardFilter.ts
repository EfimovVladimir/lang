
export class CardFilter {

  question: string;
  answer: string;
  tagIds: number[] = [];
  sectionId: number;
  orderBy: string = "asc";
  fromPage: number;
  toPage: number;
  sizePage: number;

  constructor(){ }
}
