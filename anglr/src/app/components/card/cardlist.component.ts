
import {Component, OnInit, ViewChild} from "@angular/core";
import {Card} from "../../model/Card";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";
import {LessonCard} from "../../model/LessonCard";
import {StateService} from "../../services/state.service";
import {CardFilter} from "../../model/CardFilter";
import {HttpErrorResponse} from "@angular/common/http";
import {PagerComponent} from "../pager/pager.component";
import {OnPaging} from "../pager/OnPaging";

@Component({
  selector: 'cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['../../css/list.component.css',
              '../../css/ui.element.css',
              `../../css/pager.component.css`]
})

export class CardListComponent implements OnInit, OnPaging{

  cardList: Card[];
  subsUpdateList: Subscription;
  targetCount: number = 5;
  currentCardFilter: CardFilter = new CardFilter();
  @ViewChild(PagerComponent) pagerComponent: PagerComponent;

  ngOnInit(): void {
    this.pagerComponent.parentComponent = this;
    this.setInitPage();
  }

  constructor(private appHttpService : AppHttpService,
              private interactService: InteractService,
              private stateService: StateService){
    this.subsUpdateList = this.interactService.getObservableUpdateCardList().subscribe(
      flag => {
        if(flag){
          this.stateService.getCardFilter().sectionId = this.stateService.getCurrentSection().id;
          this.setInitPage();
        }
      }
    );
  }

  getCardListByFilter() : void {
    this.setInitPage();
  }

  getRangeCardListByFilter(from: number, to: number, sizeP: number) : void {
    this.currentCardFilter.sectionId =
      this.stateService.getCurrentSection() == null ? 0 : this.stateService.getCurrentSection().id;
    this.appHttpService.getRangeCardsByFilter(this.currentCardFilter, from, to, sizeP).subscribe(
      (data) => {
        this.cardList = data;
      }
    );
  }

  deleteCard(card) : void {
    this.appHttpService.deleteCard(card).subscribe(
      (data) => {
        this.setInitPage();
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
    return this.stateService.getCurrentSection() != null;
  }

  getStateSectionId() : string {
    var result = " ";
    if(this.stateService.getCurrentSection() != null){
      result = result + " " + this.stateService.getCurrentSection().id + " " +
        this.stateService.getCurrentSection().name;
    }
    return result;
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

  setInitPage(){
    this.currentCardFilter.sectionId =
      this.stateService.getCurrentSection() == null ? 0 : this.stateService.getCurrentSection().id;
    this.appHttpService.getRowCountCardsByFilter(this.currentCardFilter).subscribe(
      (data) => {
        var size = (data == null)? 0 : data;
        this.pagerComponent.buildPager(size,1);
        this.setRangeList(this.pagerComponent.getStartIndex(), this.pagerComponent.getEndIndex(), this.pagerComponent.getPageSize());
      }
    );
  }

  setRangeList(start, end, sizePage){
    this.getRangeCardListByFilter(start, end, sizePage);
  }

}
