import {Component} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppHttpService} from "../../services/apphttp.service";
import {Lesson} from "../../model/Lesson";
import {Subscription} from "rxjs/Subscription";
import {InteractService} from "../../services/interact.service";

@Component({
  selector: 'lessonform',
  templateUrl: './lessonform.component.html',
  styleUrls: ['../../css/form.component.css'],
})

export class LessonFormComponent {

  currentLesson: Lesson = new Lesson();
  subsLesson: Subscription;

  constructor(private appService: AppHttpService, private interactService: InteractService) {
    this.subsLesson = this.interactService.getObservableLesson().subscribe(
      data => {
        this.currentLesson = (data == null)? new Lesson() : data;
      }
    )
  }

  executePostForm() : void {
    this.appService.saveOrUpdateLessonForm(this.currentLesson)
      .subscribe(
        data => {
          console.log('saved idLesson id: ' + data);
          this.interactService.sendUpdateLessonList(true);
          this.clearLessonForm();
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

  clearLessonForm() : void {
    this.currentLesson = new Lesson();
  }

}
