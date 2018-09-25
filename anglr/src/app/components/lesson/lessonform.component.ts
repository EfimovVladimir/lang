import {Component, OnInit} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppHttpService} from "../../services/apphttp.service";
import {Lesson} from "../../model/Lesson";
import {Subscription} from "rxjs/Subscription";
import {InteractService} from "../../services/interact.service";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'lessonform',
  templateUrl: './lessonform.component.html',
  styleUrls: ['../../css/form.component.css'],
})

export class LessonFormComponent implements OnInit{

  currentLesson: Lesson = new Lesson();
  subsLesson: Subscription;

  constructor(private appService: AppHttpService,
              private interactService: InteractService,
              private stateService: StateService) {
    this.subsLesson = this.interactService.getObservableLesson().subscribe(
      data => {
        this.currentLesson = (data == null)? new Lesson() : data;
      }
    )
  }

  ngOnInit(): void {
    this.currentLesson = this.stateService.getCurrentLesson();
  }

  executePostForm() : void {
    this.appService.saveOrUpdateLessonForm(this.currentLesson)
      .subscribe(
        data => {
          console.log('saved idLesson id: ' + data);
          this.interactService.sendUpdateLessonList(true);
          this.clearLessonForm();
          this.stateService.setDisplayLessonForm(false);
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

  changeLessonField() {
    this.currentLesson.questionField = (this.currentLesson.questionField == 0) ? 1 : 0;
  }

  getAskField() : string {
    return (this.currentLesson.questionField == 0) ? 'question' : 'answer';
  }

  getCheckField() : string {
    return (this.currentLesson.questionField == 0) ? 'answer' : 'question';
  }
}
