import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Section} from "../model/Section";
import {Card} from "../model/Card";
import {Tag} from "../model/Tag";
import {Lesson} from "../model/Lesson";

@Injectable()
export class AppHttpService {

  constructor(private http: HttpClient) {}

  getSectionList(): Observable<Section[]>{
    return this.http.get('http://127.0.0.1:8080/lang/sections');
  }

  saveSectionForm(section): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/save_section', section);
  }

  deleteSection(section): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/delete_section', section);
  }

  saveOrUpdateSectionForm(section): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/saveorupdate_section', section);
  }

  saveCardForm(cardForm): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/save_card', cardForm);
  }

  getCardList(): Observable<Card[]>{
    return this.http.get('http://127.0.0.1:8080/lang/cards');
  }

  deleteCard(card): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/delete_card', card);
  }

  saveOrUpdateCard(card): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/saveorupdate_card', card);
  }

  getCardListForSection(section): Observable<Card[]>{
    return this.http.post('http://127.0.0.1:8080/lang/section_cards', section);
  }

  getTagList(): Observable<Tag[]>{
    return this.http.get('http://127.0.0.1:8080/lang/tags');
  }

  saveTagForm(tag): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/save_tag', tag);
  }

  deleteTag(tag): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/delete_tag', tag);
  }

  saveOrUpdateTagForm(tag): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/saveorupdate_tag', tag);
  }

  getLessonList(): Observable<Lesson[]>{
    return this.http.get('http://127.0.0.1:8080/lang/lessons');
  }

  saveLessonForm(lesson): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/save_lesson', lesson);
  }

  deleteLesson(lesson): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/delete_lesson', lesson);
  }

  saveOrUpdateLessonForm(lesson): Observable<number> {
    return this.http.post('http://127.0.0.1:8080/lang/saveorupdate_lesson', lesson);
  }
}
