
import {Component, OnInit} from "@angular/core";
import {Card} from "../../model/Card";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";
import {Section} from "../../model/Section";

@Component({
  selector: 'cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['../../css/list.component.css']
})

export class CardListComponent implements OnInit{

  cardList: Card[];
  subsUpdateList: Subscription;
  currentSection: Section = new Section();

  ngOnInit(): void {
    this.getCardList();
  }

  constructor(private appHttpService : AppHttpService, private interactService: InteractService){
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

  deleteCard(card) : void {
    this.appHttpService.deleteCard(card).subscribe(
      (data) => {
        this.getCardList();
      }
    );
  }

  editCardForm(card) : void {
    this.interactService.sendCard(card);
  }

  newCardForm() : void {
    var card = new Card();
    card.section = this.currentSection;
    this.interactService.sendCard(card);
  }

}
