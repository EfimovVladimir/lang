
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../model/User";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  attemptAuth(user: User): Observable<User> {
    return this.http.post('http://localhost:8080/lang/auth/login', user);
  }

  signUp(user: User) : Observable<User> {
    return this.http.post('http://localhost:8080/lang/auth/signUp', user);
  }

}
