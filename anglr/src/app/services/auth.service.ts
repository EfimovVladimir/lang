
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../model/User";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  generateToken(user: User): Observable<any> {
    return this.http.post(
      'http://localhost:8080/lang/auth/generate-token', user
      // { username: user.login, password: user.password }
      );
  }

  signUp(user: User) : Observable<User> {
    return this.http.post('http://localhost:8080/lang/auth/signUp', user);
  }

  logout(user: User) : Observable<User> {
    return this.http.post('http://localhost:8080/lang/auth/logout', user);
  }

}
