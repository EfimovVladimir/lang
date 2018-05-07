import { Component } from '@angular/core';
import {InteractService} from "./services/interact.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  subsIsVisible: Subscription;
  isVisibleSectionForm = false;

  constructor(private interactService: InteractService) {
    this.subsIsVisible = this.interactService.getObservableSectFormVisbl().subscribe(
      data => {
        this.isVisibleSectionForm = <boolean>data;
      }
    )
  }

}
