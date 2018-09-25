
import {Injectable} from "@angular/core";
import {Lesson} from "../model/Lesson";
import {Card} from "../model/Card";
import {Section} from "../model/Section";
import {CardFilter} from "../model/CardFilter";

@Injectable()
export class StateService {

  private currentLesson : Lesson = new Lesson();
  private currentCard: Card = new Card();
  private currentSection: Section = new Section();
  private cardFilter: CardFilter = new CardFilter();
  private displayLessonForm: boolean = false;
  private displayCardForm: boolean = false;

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

  setDisplayLessonForm(value: boolean) {
    this.displayLessonForm = value;
  }

  isDisplayLessonForm() {
    return this.displayLessonForm;
  }

  setDisplayCardForm(value: boolean){
    this.displayCardForm = value;
  }

  isDisplayCardForm() {
    return this.displayCardForm;
  }
}
