import {Component} from "@angular/core";
import {Lesson} from "../../model/Lesson";
import {Section} from "../../model/Section";
import {User} from "../../model/User";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'currentstateheader',
  templateUrl: './currentstateheader.component.html',
  styleUrls: ['../../css/list.component.css',
              '../../css/ui.element.css']
})

export class CurrentStateHeaderComponent {

  currentLesson: Lesson = new Lesson();
  currentSection: Section = new Section();
  currentUser: User = this.stateService.getUser();

  constructor(private stateService : StateService) {  }

}
