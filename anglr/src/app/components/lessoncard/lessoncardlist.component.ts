import {Component, OnInit} from "@angular/core";
import {Lesson} from "../../model/Lesson";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";
import {LessonCard} from "../../model/LessonCard";

@Component({
  selector: 'lessoncardlist',
  templateUrl: './lessoncardlist.component.html',
  styleUrls: ['../../css/list.component.css']
})

export class LessonCardListComponent implements OnInit{

  lessonCardList: LessonCard[];
  subsUpdateList: Subscription;
  editMode = false;

  constructor(private appHttpService : AppHttpService, private interactService: InteractService) {
    this.subsUpdateList = this.interactService.getObservableUpdateLessonCardList().subscribe(
      flag => {
        if(flag){
          this.getLessonCardList();
        }
      }
    )
  };

  ngOnInit(): void {
    this.getLessonCardList();
  };

  getLessonCardList() : void {
    this.appHttpService.getLessonCardList().subscribe(
      (data) => {
        this.lessonCardList = data;
      }
    );
  }

  deleteLessonCard(section) : void {
    // this.appHttpService.deleteLesson(section).subscribe(
    //   (data) => {
    //     this.getLessonCardList();
    //     this.interactService.sendLesson(new Lesson);
    //   }
    // );
  }

  newLessonCardForm() : void {
    this.interactService.sendLessonCard(null);
  }

  editLessonCardForm(lessonCard) : void {
    this.interactService.sendLessonCard(lessonCard);
  }

  selectCardsForLesson(lessonCard) : void {
    // this.interactService.sendLesson(lessonCard);
  }

  setEditMode(flag : boolean){
    this.editMode = flag;
  }

}
