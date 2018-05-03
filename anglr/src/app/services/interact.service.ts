import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Section} from "../model/Section";

@Injectable()
export class InteractService {

  private updateList = new Subject<boolean>();
  private section = new Subject<Section>();
  private secFormVisbl = new Subject<boolean>();

  sendUpdateList(flag: boolean){
    this.updateList.next(flag);
  }

  sendSection(section: Section){
    this.section.next(section);
  }

  sendSectionFormVisible(flag: boolean){
    this.secFormVisbl.next(flag);
  }

  getObservableUpdateList(): Observable<boolean>{
    return this.updateList.asObservable();
  }

  getObservableSection(): Observable<Section>{
    return this.section.asObservable();
  }

  getObservableSectFormVisbl(): Observable<boolean>{
    return this.secFormVisbl.asObservable();
  }

}
