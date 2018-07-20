
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
  styleUrls: ['../../css/list.component.css',
              '../../css/ui.element.css']
})

export class CardListForLessonComponent implements OnInit{

  cardList: Card[];
  subsUpdateList: Subscription;
  currentSection: Section = new Section();
  currentLesson: Lesson = new Lesson();
  targetCount: number = 5;

  ngOnInit(): void {
    this.getCardsForLesson(null);
  }

  constructor(private appHttpService : AppHttpService,
              private interactService: InteractService,
              private router: Router){
    this.subsUpdateList = this.interactService.getObservableCardsForLesson().subscribe(
      data => {
        this.currentLesson = (data == null) ? null : data;
        this.getCardsForLesson(this.currentLesson);
      }
    );
  }

  getCardsForLesson(lesson) : void {
    if(lesson != null) {
      this.appHttpService.getCardListForLesson(lesson).subscribe(
        (data) => {
          this.cardList = data;
        }
      )
    }
    else {
      this.cardList = new Array();
    }
  }

  deleteCardFromLesson(card) : void {
    var lessonCard = new LessonCard();
    lessonCard.lessonCardId.card = card;
    this.interactService.sendDeleteLessonCard(lessonCard);
  }

  editCardForm(card) : void {
    this.interactService.sendCard(card);
    this.router.navigateByUrl('/cardedit');
  }

  newCardForm() : void {
    var card = new Card();
    card.section = this.currentSection;
    this.interactService.sendCard(card);
  }

}
