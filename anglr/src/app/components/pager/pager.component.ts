
import {Component} from "@angular/core";
import {PagerService} from "../../services/pager.service";
import {OnPaging} from "./OnPaging";

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: [`../../css/pager.component.css`]
})

export class PagerComponent {

  _pager: any = {};

  _allItemsSize: number;

  _parentComponent: OnPaging;

  constructor(private pagerService: PagerService){

  }

  set parentComponent(value: OnPaging) {
    this._parentComponent = value;
  }

  setPage(page: number) {
    if (page < 1 || page > this._pager.totalPages) {
      return;
    }
    this._pager = this.pagerService.calcPageParams(this._allItemsSize, page);
    console.log('getPager =' + this._pager);
    this._parentComponent.setRangeList(this._pager.startIndex, this._pager.endIndex + 1, this._pager.pageSize)
  }

  buildPager(size : number, currentPage : number){
    console.log('allItemsSize=' + size);
    this._allItemsSize = size;
    this._pager = this.pagerService.calcPageParams(size, currentPage);
  }

  getStartIndex(){
    return this._pager.startIndex;
  }

  getEndIndex(){
    return this._pager.endIndex;
  }

  getPageSize(){
    return this._pager.pageSize;
  }

}
