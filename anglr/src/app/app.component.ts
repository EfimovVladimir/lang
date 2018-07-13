import {Component, ViewChild} from '@angular/core';
import {CurrentState} from "./model/CurrentState";
import {LessonCard} from "./model/LessonCard";
import {Subscription} from "rxjs/Subscription";
import {AppHttpService} from "./services/apphttp.service";
import {InteractService} from "./services/interact.service";
import {Lesson} from "./model/Lesson";
import {HttpErrorResponse} from "@angular/common/http";
import {CurrentStateHeaderComponent} from "./components/state/currentstateheader.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  currentState: CurrentState = new CurrentState();
  lessonCardforSave: LessonCard = new LessonCard();
  subsLesson: Subscription;
  subsSaveLessonCard: Subscription;
  @ViewChild(CurrentStateHeaderComponent) stateHeader: CurrentStateHeaderComponent;

  constructor(private appService: AppHttpService, private interactService: InteractService) {
    this.subsLesson = this.interactService.getObservableLesson().subscribe(
      data => {
        this.currentState.lesson = (data == null)? new Lesson() : data;
        this.stateHeader.currentLesson = this.currentState.lesson;
      }
    );

    this.subsSaveLessonCard = this.interactService.getObservableSaveLessonCard().subscribe(
      data => {
        this.lessonCardforSave = (data == null)? new LessonCard() : data;
        this.saveOrUpdateLessonCard(this.lessonCardforSave)
      }
    )
  }

  saveOrUpdateLessonCard(lessonCard : LessonCard) : void {
    lessonCard.lessonCardId.idLesson = this.currentState.lesson.id;
    this.appService.saveOrUpdateLessonCardForm(lessonCard).subscribe(
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
