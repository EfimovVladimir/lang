
import {Component} from "@angular/core";
import {Card} from "../../model/Card";

@Component({
  selector: 'cardQuestion',
  templateUrl: './cardquestion.component.html',
  styleUrls: ['../../css/list.component.css']
})

export class CardQuestionComponent{

  currentCard: Card = new Card();
  currentAnswear: String = "";

}
