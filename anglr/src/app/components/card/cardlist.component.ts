
import {Component, OnInit} from "@angular/core";
import {Card} from "../../model/Card";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";
import {Section} from "../../model/Section";
import {LessonCard} from "../../model/LessonCard";
import {StateService} from "../../services/state.service";
import {CardFilter} from "../../model/CardFilter";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['../../css/list.component.css',
              '../../css/ui.element.css']
})

export class CardListComponent implements OnInit{

  cardList: Card[];
  subsUpdateList: Subscription;
  targetCount: number = 5;
  currentCardFilter: CardFilter = new CardFilter();

  ngOnInit(): void {
    this.getCardList();
  }

  constructor(private appHttpService : AppHttpService,
              private interactService: InteractService,
              private stateService: StateService){
    this.subsUpdateList = this.interactService.getObservableUpdateCardList().subscribe(
      flag => {
        if(flag){
          this.getSectionCardList(this.stateService.getCurrentSection());
        }
      }
    );
  }

  getCardList() : void {
    this.appHttpService.getCardList().subscribe(
      (data) => {
        this.cardList = data;
      }
    );
  }

  getSectionCardList(section : Section) : void {
    this.stateService.getCardFilter().sectionId = section.id;
    this.appHttpService.getCardsByFilter(this.stateService.getCardFilter()).subscribe(
      (data) => {
        this.cardList = data;
      }
    )
  }

  getCardListByFilter() : void {
    this.currentCardFilter.sectionId = this.stateService.getCurrentSection().id;
    this.appHttpService.getCardsByFilter(this.currentCardFilter).subscribe(
      (data) => {
        this.cardList = data;
      }
    )
  }

  deleteCard(card) : void {
    this.appHttpService.deleteCard(card).subscribe(
      (data) => {
        this.getCardList();
      }
    );
  }

  editCardForm(card) : void {
    this.interactService.sendCard(card);
  }

  addToLesson(card) : void {
    var lessonCard = new LessonCard();
    lessonCard.lessonCardId.card = card;
    lessonCard.card = card;
    lessonCard.targetCount = this.targetCount;
    lessonCard.successCount = 0;
    lessonCard.failedCount = 0;
    lessonCard.lesson = this.stateService.getCurrentLesson();
    this.saveOrUpdateLessonCard(lessonCard);
  }

  newCardForm() : void {
    var card = new Card();
    card.section = this.stateService.getCurrentSection();
    this.interactService.sendCard(card);
  }

  isSectionSelected() : boolean {
    return this.stateService.getCurrentSection() != null
  }

  getStateSectionId() : number {
    if(this.stateService.getCurrentSection() != null){
      return this.stateService.getCurrentSection().id;
    }
    return 0;
  }

  saveOrUpdateLessonCard(lessonCard : LessonCard) : void {
    this.appHttpService.saveOrUpdateLessonCardForm(lessonCard).subscribe(
      data => {
        console.log('saved LessonCard idCard=: ' + data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    )
  }

}
