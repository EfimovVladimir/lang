import {Component, OnInit} from "@angular/core";
import {Section} from "../../model/Section";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'sectionlist',
  templateUrl: './sectionlist.component.html'
})

export class SectionListComponent implements OnInit{

  sectionList: Section[];
  subsUpdateList: Subscription;

  constructor(private appHttpService : AppHttpService, private interactService: InteractService) {
    this.subsUpdateList = this.interactService.getObservableUpdateList().subscribe(
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

  selectCurrentSection(section) : void {
    this.interactService.sendSection(section);
  }

}
