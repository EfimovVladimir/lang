
import {Component, OnInit} from "@angular/core";
import {Card} from "../../model/Card";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['../../css/list.component.css']
})

export class CardListComponent implements OnInit{

  cardList: Card[];
  subsUpdateList: Subscription;

  ngOnInit(): void {
    this.getCardList();
  }

  constructor(private appHttpService : AppHttpService, private interactService: InteractService){
    this.subsUpdateList = this.interactService.getObservableUpdateCardList().subscribe(
      flag => {
        if(flag){
          this.getCardList();
        }
      }
    )
  }

  getCardList() : void {
    this.appHttpService.getCardList().subscribe(
      (data) => {
        this.cardList = data;
      }
    );
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

}
