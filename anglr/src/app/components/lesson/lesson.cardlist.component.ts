
import {Component, OnInit} from "@angular/core";
import {Card} from "../../model/Card";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";
import {Section} from "../../model/Section";
import {LessonCard} from "../../model/LessonCard";
import {Lesson} from "../../model/Lesson";
import {Router} from "@angular/router";
import {StateService} from "../../services/state.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'cardListForLesson',
  templateUrl: './lesson.cardlist.component.html',
  styleUrls: ['../../css/list.component.css',
              '../../css/ui.element.css']
})

export class CardListForLessonComponent implements OnInit{

  lessonCardList: LessonCard[];
  subsUpdateList: Subscription;
  currentSection: Section = new Section();
  targetCount: number = 5;

  ngOnInit(): void {
    this.getCardsForLesson(this.getStateLesson());
  }

  constructor(private appHttpService : AppHttpService,
              private interactService: InteractService,
              private router: Router,
              private stateService: StateService){
    this.subsUpdateList = this.interactService.getObservableCardsForLesson().subscribe(
      data => {
        this.getCardsForLesson(this.getStateLesson());
      }
    );
  }

  getCardsForLesson(lesson) : void {
    if(lesson != null) {
      this.appHttpService.getLessonCardListForLesson(lesson).subscribe(
        (data) => {
          this.lessonCardList = data;
        }
      )
    }
    else {
      this.lessonCardList = new Array();
    }
  }

  deleteCardFromLesson(lessonCard : LessonCard) : void {
    this.appHttpService.deleteLessonCard(lessonCard).subscribe(
      data => {
        console.log('deleted LessonCard idCard=: ' + data);
        this.interactService.sendUpdateLessonCardList(true);
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

  editCardForm(lessonCard : LessonCard) : void {
    this.interactService.sendCard(lessonCard.lessonCardId.card);
    this.router.navigateByUrl('/cardedit');
  }

  newCardForm() : void {
    var card = new Card();
    card.section = this.currentSection;
    this.interactService.sendCard(card);
  }

  toLearnAgain(lessonCard : LessonCard) : void {
    lessonCard.successCount = 0;
    lessonCard.failedCount = 0;
    this.appHttpService.saveOrUpdateLessonCardForm(lessonCard).subscribe(
      (data) => {
          console.log('saved idLesson id: ' + data);
      }
    )
  }

  startLesson() : void {
    this.router.navigateByUrl('/cardQuestion');
  }

  getStateLesson() : Lesson {
    return this.stateService.getCurrentLesson();
  }
}
