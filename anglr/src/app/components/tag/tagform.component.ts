import {Component} from "@angular/core";
import {Tag} from "../../model/Tag";
import {HttpErrorResponse} from "@angular/common/http";
import {InteractService} from "../../services/interact.service";
import {AppHttpService} from "../../services/apphttp.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'tagform',
  templateUrl: './tagform.component.html',
  styleUrls: ['../../css/form.component.css'],
})

export class TagFormComponent {

  currentTag: Tag = new Tag();
  subsTag: Subscription;

  constructor(private appService: AppHttpService, private interactService: InteractService){
    this.subsTag = this.interactService.getObservableTag().subscribe(
      data => {
        this.currentTag = (data == null)? new Tag() : data;
      }
    )
  }


  executePostForm() : void {
    this.appService.saveOrUpdateTagForm(this.currentTag)
      .subscribe(
        data => {
          console.log('saved tag id: ' + data);
          this.interactService.sendUpdateTagList(true);
          this.clearTagForm();
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

  clearTagForm(){
    this.currentTag = new Tag();
  }

}
