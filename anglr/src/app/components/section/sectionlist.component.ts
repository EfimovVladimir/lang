import {Component, OnInit} from "@angular/core";
import {Section} from "../../model/Section";
import {AppHttpService} from "../../services/apphttp.service";

@Component({
  selector: 'sectionlist',
  templateUrl: './sectionlist.component.html'
})

export class SectionListComponent implements OnInit{

  sectionList: Section[];

  constructor(private appHttpService : AppHttpService) {}

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


}
