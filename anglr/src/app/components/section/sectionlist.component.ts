import {Component, OnInit} from "@angular/core";
import {Section} from "../../model/Section";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";

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

  constructor(private appHttpService : AppHttpService, private interactService: InteractService) {
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
        this.interactService.sendSection(new Section);
      }
    );
  }

  editSectionForm(section) : void {
    this.interactService.sendSection(section);
  }

  selectCardsForSection(section) : void {
    this.interactService.sendSection(section);
  }

  newSectionForm() : void {
    this.interactService.sendSection(null);
  }

  setEditMode(flag : boolean){
    this.editMode = flag;
  }

}
