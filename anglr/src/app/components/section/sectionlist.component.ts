import {Component, OnInit} from "@angular/core";
import {Section} from "../../model/Section";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'sectionlist',
  templateUrl: './sectionlist.component.html',
  styleUrls: ['../../css/list.component.css',
              '../../css/ui.element.css']
})

export class SectionListComponent implements OnInit{

  sectionList: Section[];
  subsUpdateList: Subscription;
  editMode = false;

  constructor(private appHttpService : AppHttpService,
              private interactService: InteractService,
              private stateService: StateService) {
    this.subsUpdateList = this.interactService.getObservableUpdateSectionList().subscribe(
      flag => {
        if(flag){
          this.getSectionList();
        }
      }
    )
  };

  ngOnInit(): void {
    this.getSectionList();
  };

  getSectionList() : void {
    this.appHttpService.getSectionList().subscribe(
      (data) => {
        this.sectionList = data;
      }
    );
  }

  deleteSection(section) : void {
    this.appHttpService.deleteSection(section).subscribe(
      (data) => {
        this.getSectionList();
      }
    );
  }

  editSectionForm(section) : void {
    this.interactService.sendSection(section);
  }

  selectCardsForSection(section) : void {
    this.stateService.setCurrentSection(section);
    this.interactService.sendUpdateCardList(true);
  }

  newSectionForm() : void {
    this.interactService.sendSection(null);
  }

  setEditMode(flag : boolean){
    this.editMode = flag;
  }

}
