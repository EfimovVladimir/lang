
import {Component} from "@angular/core";
import {Card} from "../../model/Card";

@Component({
  selector: 'cardview',
  templateUrl: './cardview.component.html',
  styleUrls: ['../../css/list.component.css']
})

export class CardViewComponent{

  currentCard: Card = new Card();

}
