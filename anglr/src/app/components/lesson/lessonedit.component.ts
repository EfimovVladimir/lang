import {Component, OnInit, ViewChild} from "@angular/core";
import {LessonListComponent} from "./lessonlist.component";

@Component({
  selector: 'lessonedit',
  templateUrl: './lessonedit.component.html',
  styleUrls: ['../../app.component.css'],
})

export class LessonEditComponent implements OnInit{

  @ViewChild(LessonListComponent) lessonList: LessonListComponent;

  ngOnInit(): void {
    this.lessonList.setEditMode(true);
  }

}
