import {Component, OnInit} from "@angular/core";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {Subscription} from "rxjs/Subscription";
import {Tag} from "../../model/Tag";

@Component({
  selector: 'taglist',
  templateUrl: './taglist.component.html',
  styleUrls: ['../../css/list.component.css',
              '../../css/ui.element.css']
})

export class TagListComponent implements OnInit{

  tagList: Tag[];
  subsUpdateList: Subscription;
  editMode = false;

  constructor(private appHttpService : AppHttpService, private interactService: InteractService) {
    this.subsUpdateList = this.interactService.getObservableUpdateTagList().subscribe(
      flag => {
        if(flag){
          this.getTagList();
        }
      }
    )
  };

  ngOnInit(): void {
    this.getTagList();
  };

  getTagList() : void {
    this.appHttpService.getTagList().subscribe(
      (data) => {
        this.tagList = data;
      }
    );
  }

  deleteTag(tag) : void {
    this.appHttpService.deleteTag(tag).subscribe(
      (data) => {
        this.getTagList();
        this.interactService.sendTag(new Tag);
      }
    );
  }

  editTagForm(tag) : void {
    this.interactService.sendTag(tag);
  }

  addTagToCard(tag) : void {
    this.interactService.sendTag(tag);
  }

  newTagForm() : void {
    this.interactService.sendTag(null);
  }

  setEditMode(flag : boolean){
    this.editMode = flag;
  }

}
