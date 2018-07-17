import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Section} from "../model/Section";
import {Card} from "../model/Card";
import {Tag} from "../model/Tag";
import {Lesson} from "../model/Lesson";
import {LessonCard} from "../model/LessonCard";

@Injectable()
export class InteractService {

  private updateSectionList = new Subject<boolean>();
  private updateTagList = new Subject<boolean>();
  private updateCardList = new Subject<boolean>();
  private updateLessonList = new Subject<boolean>();
  private updateLessonCardList = new Subject<boolean>();
  private saveLessonCard = new Subject<LessonCard>();
  private deleteLessonCard = new Subject<LessonCard>();
  private section = new Subject<Section>();
  private card = new Subject<Card>();
  private cardtag = new Subject<Tag>();
  private lesson = new Subject<Lesson>();
  private lessonCard = new Subject<LessonCard>();

  sendUpdateSectionList(flag: boolean){
    this.updateSectionList.next(flag);
  }

  sendUpdateTagList(flag: boolean){
    this.updateTagList.next(flag);
  }

  sendUpdateCardList(flag: boolean){
    this.updateCardList.next(flag);
  }

  sendUpdateLessonList(flag: boolean){
    this.updateLessonList.next(flag);
  }

  sendUpdateLessonCardList(flag: boolean){
    this.updateLessonCardList.next(flag);
  }

  sendSaveLessonCard(lessonCard: LessonCard){
    this.saveLessonCard.next(lessonCard);
  }

  sendDeleteLessonCard(lessonCard: LessonCard){
    this.deleteLessonCard.next(lessonCard);
  }

  sendSection(section: Section){
    this.section.next(section);
  }

  sendCard(card: Card){
    this.card.next(card);
  }

  sendTag(cardtag: Tag){
    this.cardtag.next(cardtag);
  }

  sendLesson(lesson: Lesson){
    this.lesson.next(lesson);
  }

  sendLessonCard(lessonCard: LessonCard){
    this.lessonCard.next(lessonCard);
  }

  getObservableUpdateSectionList(): Observable<boolean>{
    return this.updateSectionList.asObservable();
  }

  getObservableUpdateTagList(): Observable<boolean>{
    return this.updateTagList.asObservable();
  }

  getObservableUpdateCardList(): Observable<boolean>{
    return this.updateCardList.asObservable();
  }

  getObservableUpdateLessonList(): Observable<boolean>{
    return this.updateLessonList.asObservable();
  }

  getObservableUpdateLessonCardList(): Observable<boolean>{
    return this.updateLessonCardList.asObservable();
  }

  getObservableSection(): Observable<Section>{
    return this.section.asObservable();
  }

  getObservableCard(): Observable<Card>{
    return this.card.asObservable();
  }

  getObservableTag(): Observable<Tag>{
    return this.cardtag.asObservable();
  }

  getObservableLesson(): Observable<Lesson>{
    return this.lesson.asObservable();
  }

  getObservableLessonCard(): Observable<LessonCard>{
    return this.lessonCard.asObservable();
  }

  getObservableSaveLessonCard(): Observable<LessonCard>{
    return this.saveLessonCard.asObservable();
  }

  getObservableDeleteLessonCard(): Observable<LessonCard>{
    return this.deleteLessonCard.asObservable();
  }

}
