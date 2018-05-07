
import {Component, OnInit} from "@angular/core";
import {Card} from "../../model/Card";
import {AppHttpService} from "../../services/apphttp.service";

@Component({
  selector: 'cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['../../css/list.component.css']
})

export class CardListComponent implements OnInit{

  cardList: Card[];

  ngOnInit(): void {
    this.getCardList();
  }

  constructor(private appHttpService : AppHttpService){

  }

  getCardList() : void {
    this.appHttpService.getCardList().subscribe(
      (data) => {
        this.cardList = data;
      }
    );
  }


}
