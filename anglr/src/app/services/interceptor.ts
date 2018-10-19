import {Injectable} from "@angular/core";
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpUserEvent
} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {StateService} from "./state.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private state: StateService,
              private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept:' + this.state.isAuthenticated());
    if (this.state.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Basic ' + this.getBasicAuth()
        }
      });
    }
  return next.handle(req);
}

  getBasicAuth() : string {
    return btoa(this.state.getUser().login + ':' + this.state.getUser().password);
  }

}
