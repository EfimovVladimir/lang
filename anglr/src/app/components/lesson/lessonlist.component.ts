import {Component, OnInit} from "@angular/core";
import {Lesson} from "../../model/Lesson";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'lessonlist',
  templateUrl: './lessonlist.component.html',
  styleUrls: ['../../css/list.component.css']
})

export class LessonListComponent implements OnInit{

  lessonList: Lesson[];
  subsUpdateList: Subscription;
  editMode = false;

  constructor(private appHttpService : AppHttpService, private interactService: InteractService) {
    this.subsUpdateList = this.interactService.getObservableUpdateLessonList().subscribe(
      flag => {
        if(flag){
          this.getLessonList();
        }
      }
    )
  };

  ngOnInit(): void {
    this.getLessonList();
  };

  getLessonList() : void {
    this.appHttpService.getLessonList().subscribe(
      (data) => {
        this.lessonList = data;
      }
    );
  }

  deleteLesson(section) : void {
    this.appHttpService.deleteLesson(section).subscribe(
      (data) => {
        this.getLessonList();
        this.interactService.sendLesson(new Lesson);
      }
    );
  }

  newLessonForm() : void {
    this.interactService.sendLesson(null);
  }

  editLessonForm(lesson) : void {
    this.interactService.sendLesson(lesson);
  }

  selectCardsForLesson(lesson) : void {
    this.interactService.sendLesson(lesson);
  }

  setEditMode(flag : boolean){
    this.editMode = flag;
  }

}
