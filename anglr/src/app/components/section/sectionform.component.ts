import {Component} from "@angular/core";
import {Section} from "../../model/Section";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppHttpService} from "../../services/apphttp.service";

@Component({
  selector: 'sectionform',
  templateUrl: './sectionform.component.html'
})

export class SectionFormComponent {

  constructor(private http: HttpClient, private appService: AppHttpService) {}

  currentSection: Section = new Section();

  executePostForm() : void {
    this.appService.saveSectionForm(this.currentSection)
      .subscribe(
        data => {
          this.currentSection.id = <number>data;
          console.log('saved section id: ' + data);
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

}
