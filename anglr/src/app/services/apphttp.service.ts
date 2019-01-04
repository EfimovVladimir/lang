import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Section} from "../model/Section";
import {Card} from "../model/Card";
import {Tag} from "../model/Tag";
import {Lesson} from "../model/Lesson";
import {LessonCard} from "../model/LessonCard";
import {LessonCardId} from "../model/LessonCardId";
import {CardFilter} from "../model/CardFilter";
import {User} from "../model/User";

@Injectable()
export class AppHttpService {

  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://127.0.0.1:8080/lang';

  getSectionList(): Observable<Section[]>{
    return this.http.get(this.baseUrl + '/sections');
  }

  saveSectionForm(section): Observable<number> {
    return this.http.post(this.baseUrl + '/save_section', section);
  }

  deleteSection(section): Observable<number> {
    return this.http.post(this.baseUrl +  '/delete_section', section);
  }

  saveOrUpdateSectionForm(section): Observable<number> {
    return this.http.post(this.baseUrl + '/saveorupdate_section', section);
  }

  saveCardForm(cardForm): Observable<number> {
    return this.http.post(this.baseUrl + '/save_card', cardForm);
  }

  getCardList(): Observable<Card[]>{
    return this.http.get(this.baseUrl + '/cards');
  }

  deleteCard(card): Observable<number> {
    return this.http.post(this.baseUrl + '/delete_card', card);
  }

  saveOrUpdateCard(card): Observable<number> {
    return this.http.post(this.baseUrl + '/saveorupdate_card', card);
  }

  getCardListForSection(section): Observable<Card[]>{
    return this.http.post(this.baseUrl + '/section_cards', section);
  }

  getTagList(): Observable<Tag[]>{
    return this.http.get(this.baseUrl + '/tags');
  }

  saveTagForm(tag): Observable<number> {
    return this.http.post(this.baseUrl + '/save_tag', tag);
  }

  deleteTag(tag): Observable<number> {
    return this.http.post(this.baseUrl + '/delete_tag', tag);
  }

  saveOrUpdateTagForm(tag): Observable<number> {
    return this.http.post(this.baseUrl + '/saveorupdate_tag', tag);
  }

  saveOrUpdateUserForm(user): Observable<number> {
    return this.http.post(this.baseUrl + '/saveorupdate_user', user);
  }

  getUserList(): Observable<User[]>{
    return this.http.get(this.baseUrl + '/users');
  }

  deleteUser(user): Observable<number> {
    return this.http.post(this.baseUrl + '/delete_user', user);
  }

  getLessonList(): Observable<Lesson[]>{
    return this.http.get(this.baseUrl + '/lessons');
  }

  saveLessonForm(lesson): Observable<number> {
    return this.http.post(this.baseUrl + '/save_lesson', lesson);
  }

  deleteLesson(lesson): Observable<number> {
    return this.http.post(this.baseUrl + '/delete_lesson', lesson);
  }

  saveOrUpdateLessonForm(lesson): Observable<number> {
    return this.http.post(this.baseUrl + '/saveorupdate_lesson', lesson);
  }

  getLessonCardList(): Observable<LessonCard[]>{
    return this.http.get(this.baseUrl + '/lessoncards');
  }

  saveLessonCardForm(lessonCard): Observable<number> {
    return this.http.post(this.baseUrl + '/save_lessoncard', lessonCard);
  }

  deleteLessonCard(lessonCard): Observable<number> {
    console.log("send" + lessonCard);
    return this.http.post(this.baseUrl + '/delete_lessoncard', lessonCard);
  }

  saveOrUpdateLessonCardForm(lessonCard): Observable<number> {
    console.log(lessonCard);
    return this.http.post(this.baseUrl + '/saveorupdate_lessoncard', lessonCard);
  }

  getCardListForLesson(lesson): Observable<Card[]> {
    return this.http.post(this.baseUrl + "/cards_forlesson", lesson);
  }

  getLessonCardListForLesson(lesson): Observable<LessonCard[]> {
    return this.http.post(this.baseUrl + "/lessoncards_forlesson", lesson);
  }

  getLessonCardListToStartLesson(lesson): Observable<LessonCard[]> {
    return this.http.post(this.baseUrl + "/lessoncards_startlesson", lesson);
  }

  getCardsByFilter(cardFilter : CardFilter) : Observable<Card[]> {
    return this.http.post(this.baseUrl + "/cards_byfilter", cardFilter);
  }

  getRangeCardsByFilter(cardFilter : CardFilter, from: number, to: number, sizeP: number) : Observable<Card[]> {
    cardFilter.fromPage = from;
    cardFilter.toPage = to;
    cardFilter.sizePage = sizeP;
    return this.http.post(this.baseUrl + "/range_cards_byfilter", cardFilter);
  }

  getRowCountCardsByFilter(cardFilter : CardFilter) : Observable<number> {
    return this.http.post(this.baseUrl + "/count_cards_byfilter", cardFilter);
  }
}
