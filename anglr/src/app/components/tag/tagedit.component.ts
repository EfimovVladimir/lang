import {Component, OnInit, ViewChild} from "@angular/core";
import {TagListComponent} from "./taglist.component";

@Component({
  selector: 'tagedit',
  templateUrl: './tagedit.component.html',
  styleUrls: ['../../app.component.css'],
})

export class TagEditComponent implements OnInit{

  @ViewChild(TagListComponent) tagList: TagListComponent;

  ngOnInit(): void {
    this.tagList.setEditMode(true);
  }

}
