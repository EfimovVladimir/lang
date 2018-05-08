import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {SectionListComponent} from "../section/sectionlist.component";

@Component({
  selector: 'cardedit',
  templateUrl: './cardedit.component.html',
  styleUrls: ['../../app.component.css'],
})

export class CardEditComponent implements OnInit{

  @ViewChild(SectionListComponent) sectionList: SectionListComponent;

  ngOnInit(): void {
    this.sectionList.setEditMode(false);
  };

}
