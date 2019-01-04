import {Component} from "@angular/core";
import {User} from "../../model/User";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {StateService} from "../../services/state.service";
import {TokenStorage} from "../../services/token.storage";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";

@Component({
  selector: 'loginComponent',
  templateUrl: './login.component.html',
  styleUrls: ['../../css/login.component.css',
              '../../css/ui.element.css'],
})

export class LoginComponent {

  isSignUp = false;
  user: User = new User();
  errorMsg: string = "";
  warningMsg: string = "";

  constructor(private auth: AuthService,
              private interactService: InteractService,
              private state: StateService,
              private router: Router,
              private token: TokenStorage) {
  }

  login() {
    console.log(this.user);
    this.auth.generateToken(this.user).subscribe(
      data => {
        console.log(data);
        if (data != null) {
          this.token.saveToken(data.token);
          this.state.setAuthenticated(true);
          this.user.userRole = data.userRole;
          this.state.setUser(this.user);
          this.interactService.sendUser(this.user);
          this.router.navigateByUrl('/cardedit');
        } else {
          this.state.setAuthenticated(false);
          this.errorMsg = "Wrong login or password. Try again";
        }
    });
  }

  signUp() {
    this.auth.signUp(this.user).subscribe(
      data => {
        if (data != null) {
          this.setSignUp(data.id > 0);
          if(data.id > 0) {
            this.warningMsg = "User is saved. Now you can login"
          }
          else {
            this.warningMsg = "User is not saved. Try again"
          }
        }
        console.log(data);
      });
  }

  logout() {
    this.user = new User();
    this.state.setUser(new User());
    this.state.setAuthenticated(false);
    this.token.signOut();
    this.interactService.sendUser(new User());
    this.errorMsg = "";
    this.warningMsg = "";
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated();
  }

  setSignUp(value : boolean){
    this.isSignUp = value;
    this.errorMsg = "";
    this.warningMsg = "";
  }

}
