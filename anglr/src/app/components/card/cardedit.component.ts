import {Component, OnInit, ViewChild} from "@angular/core";
import {SectionListComponent} from "../section/sectionlist.component";
import {CardListComponent} from "./cardlist.component";
import {CardFormComponent} from "./cardform.component";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'cardedit',
  templateUrl: './cardedit.component.html',
  styleUrls: ['../../app.component.css',
              '../../css/ui.element.css'],
})

export class CardEditComponent implements OnInit{

  @ViewChild(SectionListComponent) sectionList: SectionListComponent;

  ngOnInit(): void {
    this.sectionList.setEditMode(false);
  };

  constructor(private stateService: StateService) {

  }

  isDisplayCardForm(){
    return this.stateService.isDisplayCardForm();
  }

}
