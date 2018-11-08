import {Component, OnInit} from "@angular/core";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../model/User";

@Component({
  selector: 'userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['../../css/list.component.css',
    '../../css/ui.element.css']
})

export class UserListComponent implements OnInit{

  userList: User[];
  subsUpdateList: Subscription;
  editMode = false;

  constructor(private appHttpService : AppHttpService, private interactService: InteractService) {
    this.subsUpdateList = this.interactService.getObservableUpdateUserList().subscribe(
      flag => {
        if(flag){
          this.getUserList();
        }
      }
    )
  };

  ngOnInit(): void {
    this.getUserList();
  };

  getUserList() : void {
    this.appHttpService.getUserList().subscribe(
      (data) => {
        this.userList = data;
      }
    );
  }

  deleteUser(user) : void {
    this.appHttpService.deleteUser(user).subscribe(
      (data) => {
        this.getUserList();
        this.interactService.sendUser(new User);
      }
    );
  }

  editUserForm(user) : void {
    this.interactService.sendUser(user);
  }

  newUserForm() : void {
    this.interactService.sendUser(null);
  }

  setEditMode(flag : boolean){
    this.editMode = flag;
  }

}
