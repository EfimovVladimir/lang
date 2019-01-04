import {Component, ViewChild} from '@angular/core';
import {CurrentState} from "./model/CurrentState";
import {LessonCard} from "./model/LessonCard";
import {Subscription} from "rxjs/Subscription";
import {AppHttpService} from "./services/apphttp.service";
import {InteractService} from "./services/interact.service";
import {Lesson} from "./model/Lesson";
import {HttpErrorResponse} from "@angular/common/http";
import {CurrentStateHeaderComponent} from "./components/state/currentstateheader.component";
import {Section} from "./model/Section";
import {StateService} from "./services/state.service";
import {User} from "./model/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  currentState: CurrentState = new CurrentState();
  subsLesson: Subscription;
  subsSection: Subscription;
  subsUser: Subscription;
  @ViewChild(CurrentStateHeaderComponent) stateHeader: CurrentStateHeaderComponent;

  constructor(private appService: AppHttpService,
              private interactService: InteractService,
              private state: StateService) {
    this.subsLesson = this.interactService.getObservableLesson().subscribe(
      data => {
        this.currentState.lesson = (data == null)? new Lesson() : data;
        this.stateHeader.currentLesson = this.currentState.lesson;
      }
    );
    this.subsSection = this.interactService.getObservableSection().subscribe(
      data => {
        this.currentState.section = (data == null)? new Section() : data;
        this.stateHeader.currentSection = this.currentState.section;
      }
    );
    this.subsUser = this.interactService.getObservableUser().subscribe(
      data => {
        this.stateHeader.currentUser = this.state.getUser();
      }
    );
  }

  isUserAdmin() {
    let user: User = this.state.getUser();
    return user != null && user.userRole == 'ADMIN';
  }

}
