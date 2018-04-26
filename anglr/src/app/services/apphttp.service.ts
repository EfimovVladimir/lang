import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Section} from "../model/Section";

@Injectable()
export class AppHttpService {

  constructor(private http: HttpClient) {}

  getSectionList(): Observable<Section[]>{
    return this.http.get('http://127.0.0.1:8080/lang/sections');
  }

}