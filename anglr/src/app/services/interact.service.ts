import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Section} from "../model/Section";
import {Card} from "../model/Card";
import {Tag} from "../model/Tag";

@Injectable()
export class InteractService {

  private updateSectionList = new Subject<boolean>();
  private updateTagList = new Subject<boolean>();
  private updateCardList = new Subject<boolean>();
  private section = new Subject<Section>();
  private card = new Subject<Card>();
  private cardtag = new Subject<Tag>();

  sendUpdateSectionList(flag: boolean){
    this.updateSectionList.next(flag);
  }

  sendUpdateTagList(flag: boolean){
    this.updateTagList.next(flag);
  }

  sendUpdateCardList(flag: boolean){
    this.updateCardList.next(flag);
  }

  sendSection(section: Section){
    this.section.next(section);
  }

  sendCard(card: Card){
    this.card.next(card);
  }

  sendTag(cardtag: Tag){
    this.cardtag.next(cardtag);
  }

  getObservableUpdateSectionList(): Observable<boolean>{
    return this.updateSectionList.asObservable();
  }

  getObservableUpdateTagList(): Observable<boolean>{
    return this.updateTagList.asObservable();
  }

  getObservableUpdateCardList(): Observable<boolean>{
    return this.updateCardList.asObservable();
  }

  getObservableSection(): Observable<Section>{
    return this.section.asObservable();
  }

  getObservableCard(): Observable<Card>{
    return this.card.asObservable();
  }

  getObservableTag(): Observable<Tag>{
    return this.cardtag.asObservable();
  }

}
