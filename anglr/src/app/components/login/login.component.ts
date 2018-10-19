import {Component} from "@angular/core";
import {User} from "../../model/User";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'loginComponent',
  templateUrl: './login.component.html',
  styleUrls: ['../../css/login.component.css'],
})

export class LoginComponent {

  isSignUp = false;
  user: User = new User();
  errorMsg: string = "";

  constructor(private auth: AuthService,
              private state: StateService,
              private router: Router) {
  }

  login() {
    console.log(this.user);
    this.auth.attemptAuth(this.user).subscribe(
      data => {
        if (data.id > 0) {
          console.log(data);
          this.state.setAuthenticated(true);
          this.state.setUser(data);
          this.router.navigateByUrl('/sectionedit');
        } else {
          this.state.setAuthenticated(false);
          this.errorMsg = "Wrong login or password. Try again";
        }
    });
  }

  signUp() {
    console.log(this.user);
    this.auth.signUp(this.user).subscribe(
      data => {
        if (data.id > 0) {
          this.state.setAuthenticated(true);
          this.state.setUser(data);
          this.router.navigateByUrl('/sectionedit');
        } else {
          this.state.setAuthenticated(false);
        }
      });
  }

  logout() {
    this.user = new User();
    this.state.setUser(new User());
    this.state.setAuthenticated(false);
    this.errorMsg = "";
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated();
  }

  setSignUp(value : boolean){
    this.isSignUp = value;
  }

}
