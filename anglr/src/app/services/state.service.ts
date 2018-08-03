
import {Injectable} from "@angular/core";
import {Lesson} from "../model/Lesson";
import {Card} from "../model/Card";
import {Section} from "../model/Section";
import {CardFilter} from "../model/CardFilter";

@Injectable()
export class StateService {

  private currentLesson : Lesson;
  private currentCard: Card;
  private currentSection: Section;
  private cardFilter: CardFilter = new CardFilter();

  constructor(){ }


  getCurrentLesson(): Lesson {
    return this.currentLesson;
  }

  setCurrentLesson(value: Lesson) {
    this.currentLesson = value;
  }

  getCurrentCard(): Card {
    return this.currentCard;
  }

  setCurrentCard(value: Card) {
    this.currentCard = value;
  }

  getCurrentSection(): Section {
    return this.currentSection;
  }

  setCurrentSection(section: Section) {
    this.currentSection = section;
  }


  getCardFilter(): CardFilter {
    return this.cardFilter;
  }

  setCardFilter(value: CardFilter) {
    this.cardFilter = value;
  }
}
