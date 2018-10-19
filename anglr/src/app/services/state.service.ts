
import {Injectable} from "@angular/core";
import {Lesson} from "../model/Lesson";
import {Card} from "../model/Card";
import {Section} from "../model/Section";
import {CardFilter} from "../model/CardFilter";
import {User} from "../model/User";

@Injectable()
export class StateService {

  private currentLesson : Lesson = new Lesson();
  private currentCard: Card = new Card();
  private currentSection: Section = new Section();
  private cardFilter: CardFilter = new CardFilter();
  private displayLessonForm: boolean = false;
  private displayCardForm: boolean = false;
  private authenticated: boolean = false;
  private user: User = new User();

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

  setAuthenticated(value: boolean){
    this.authenticated = value;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setUser(user: User){
    this.user = user;
  }

  getUser(): User{
    return this.user;
  }
}
