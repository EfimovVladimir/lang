import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Section} from "../model/Section";
import {Card} from "../model/Card";

@Injectable()
export class InteractService {

  private updateSectionList = new Subject<boolean>();
  private updateCardList = new Subject<boolean>();
  private section = new Subject<Section>();
  private card = new Subject<Card>();

  sendUpdateSectionList(flag: boolean){
    this.updateSectionList.next(flag);
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

  getObservableUpdateSectionList(): Observable<boolean>{
    return this.updateSectionList.asObservable();
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

}
