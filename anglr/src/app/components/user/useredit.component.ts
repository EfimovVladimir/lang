import {Component, OnInit, ViewChild} from "@angular/core";
import {UserListComponent} from "./userlist.component";

@Component({
  selector: 'useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['../../app.component.css'],
})

export class UserEditComponent implements OnInit{

  @ViewChild(UserListComponent) userList: UserListComponent;

  ngOnInit(): void {
    this.userList.setEditMode(true);
  }

}
