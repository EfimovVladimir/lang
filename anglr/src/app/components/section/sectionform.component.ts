import {Component} from "@angular/core";
import {Section} from "../../model/Section";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service"
import {Subscription} from "rxjs/Subscription";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'sectionform',
  templateUrl: './sectionform.component.html',
  styleUrls: ['../../css/form.component.css'],
})

export class SectionFormComponent {

  currentSection: Section = new Section();
  subsSection: Subscription;

  constructor(private appService: AppHttpService,
              private interactService: InteractService,
              private stateService: StateService) {
    this.subsSection = this.interactService.getObservableSection().subscribe(
      data => {
        this.currentSection = (data == null)? new Section() : data;
      }
    )
  }

  executePostForm() : void {
    this.currentSection.userId = this.stateService.getUser().id;
    this.appService.saveOrUpdateSectionForm(this.currentSection)
      .subscribe(
        data => {
          console.log('saved section id: ' + data);
          this.interactService.sendUpdateSectionList(true);
          this.clearSectionForm();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        }
      )
  }

  clearSectionForm() : void {
    this.currentSection = new Section();
  }

}
