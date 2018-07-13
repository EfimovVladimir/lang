import {Component} from "@angular/core";
import {Lesson} from "../../model/Lesson";

@Component({
  selector: 'currentstateheader',
  templateUrl: './currentstateheader.component.html',
  styleUrls: ['../../css/list.component.css']
})

export class CurrentStateHeaderComponent {

  currentLesson: Lesson = new Lesson();

  constructor() {  }

}
