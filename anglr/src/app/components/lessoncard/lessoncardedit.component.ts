import {Component, OnInit, ViewChild} from "@angular/core";
import {LessonCardListComponent} from "./lessoncardlist.component";

@Component({
  selector: 'lessonCardEdit',
  templateUrl: './lessoncardedit.component.html',
  styleUrls: ['../../app.component.css'],
})

export class LessonCardEditComponent implements OnInit{

  @ViewChild(LessonCardListComponent) lessonCardList: LessonCardListComponent;

  ngOnInit(): void {
    this.lessonCardList.setEditMode(true);
  }

}
