import {Component} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {InteractService} from "../../services/interact.service";
import {AppHttpService} from "../../services/apphttp.service";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../model/User";

@Component({
  selector: 'userform',
  templateUrl: './userform.component.html',
  styleUrls: ['../../css/form.component.css'],
})

export class UserFormComponent {

  currentUser: User = new User();
  subsUser: Subscription;

  constructor(private appService: AppHttpService, private interactService: InteractService){
    this.subsUser = this.interactService.getObservableUser().subscribe(
      data => {
        this.currentUser = (data == null)? new User() : data;
      }
    )
  }


  executePostForm() : void {
    this.appService.saveOrUpdateUserForm(this.currentUser)
      .subscribe(
        data => {
          console.log('saved user id: ' + data);
          this.interactService.sendUpdateUserList(true);
          this.clearUserForm();
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

  clearUserForm(){
    this.currentUser = new User();
  }

}
