
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../model/User";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  baseUrl: string = 'http://127.0.0.1:8080/lang';

  generateToken(user: User): Observable<any> {
    return this.http.post(
      this.baseUrl + '/auth/generate-token', user
      // { username: user.login, password: user.password }
      );
  }

  signUp(user: User) : Observable<User> {
    return this.http.post(this.baseUrl + '/auth/signUp', user);
  }

  logout(user: User) : Observable<User> {
    return this.http.post(this.baseUrl + '/auth/logout', user);
  }

}
