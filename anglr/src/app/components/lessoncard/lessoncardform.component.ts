import {Component} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppHttpService} from "../../services/apphttp.service";
import {Subscription} from "rxjs/Subscription";
import {InteractService} from "../../services/interact.service";
import {LessonCard} from "../../model/LessonCard";

@Component({
  selector: 'lessonCardForm',
  templateUrl: './lessoncardform.component.html',
  styleUrls: ['../../css/form.component.css'],
})

export class LessonCardFormComponent {

  currentLessonCard: LessonCard = new LessonCard();
  subsLessonCard: Subscription;

  constructor(private appService: AppHttpService, private interactService: InteractService) {
    this.subsLessonCard = this.interactService.getObservableLessonCard().subscribe(
      data => {
        this.currentLessonCard = (data == null)? new LessonCard() : data;
      }
    )
  }

  executePostForm() : void {
    this.appService.saveOrUpdateLessonCardForm(this.currentLessonCard)
      .subscribe(
        data => {
          console.log('saved idLesson id: ' + data);
          this.interactService.sendUpdateLessonCardList(true);
          this.clearLessonCardForm();
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

  clearLessonCardForm() : void {
    this.currentLessonCard = new LessonCard();
  }

}
