import {Component, OnInit} from "@angular/core";
import {Section} from "../../model/Section";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'sectionlist',
  templateUrl: './sectionlist.component.html',
  styleUrls: ['../../css/list.component.css']
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

  openSectionForm(section) : void {
    this.interactService.sendSectionFormVisible(true);
    this.interactService.sendSection(section);
  }

  openNewSectionForm() : void {
    this.interactService.sendSectionFormVisible(true);
    this.interactService.sendSection(null);
  }

  setEditMode(flag : boolean){
    this.editMode = flag;
  }

}
