
import {Component, OnInit} from "@angular/core";
import {Card} from "../../model/Card";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";
import {Section} from "../../model/Section";
import {LessonCard} from "../../model/LessonCard";
import {Lesson} from "../../model/Lesson";
import {Router} from "@angular/router";

@Component({
  selector: 'cardListForLesson',
  templateUrl: './lesson.cardlist.component.html',
  styleUrls: ['../../css/list.component.css']
})

export class CardListForLessonComponent implements OnInit{

  cardList: Card[];
  subsUpdateList: Subscription;
  currentSection: Section = new Section();
  currentLesson: Lesson = new Lesson();
  targetCount: number = 5;

  ngOnInit(): void {
    this.getCardList();
  }

  constructor(private appHttpService : AppHttpService,
              private interactService: InteractService,
              private router: Router){
    this.subsUpdateList = this.interactService.getObservableUpdateCardList().subscribe(
      flag => {
        if(flag){
          this.getSectionCardList(this.currentSection);
        }
      }
    );
    this.interactService.getObservableSection().subscribe(
      data => {
        this.currentSection = data;
        this.getSectionCardList(this.currentSection);
      }
    );
  }

  getCardList() : void {
    this.appHttpService.getCardList().subscribe(
      (data) => {
        this.cardList = data;
      }
    );
  }

  getSectionCardList(section) : void {
    this.appHttpService.getCardListForSection(section).subscribe(
      (data) => {
        this.cardList = data;
      }
    )
  }

  deleteCardFromLesson(card) : void {
    // this.appHttpService.deleteCard(card).subscribe(
    //   (data) => {
    //     this.getCardList();
    //   }
    // );
    var lessonCard = new LessonCard();
    lessonCard.lessonCardId.idCard = card.id;
    this.interactService.sendDeleteLessonCard(lessonCard);
  }

  editCardForm(card) : void {
    this.interactService.sendCard(card);
    this.router.navigateByUrl('/cardedit');
  }

  addToLesson(card) : void {
    var lessonCard = new LessonCard();
    lessonCard.lessonCardId.idCard = card.id;
    lessonCard.targetCount = this.targetCount;
    lessonCard.successCount = 0;
    lessonCard.failedCount = 0;
    this.interactService.sendSaveLessonCard(lessonCard);
  }

  newCardForm() : void {
    var card = new Card();
    card.section = this.currentSection;
    this.interactService.sendCard(card);
  }

}
