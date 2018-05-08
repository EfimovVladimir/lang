import {Component, OnInit, ViewChild} from "@angular/core";
import {SectionListComponent} from "./sectionlist.component";

@Component({
  selector: 'sectionedit',
  templateUrl: './sectionedit.component.html',
  styleUrls: ['../../app.component.css'],
})

export class SectionEditComponent implements OnInit{

  @ViewChild(SectionListComponent) sectionList: SectionListComponent;

  ngOnInit(): void {
    this.sectionList.setEditMode(true);
  }

}
