
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {Card} from "../../model/Card";
import {AppHttpService} from "../../services/apphttp.service";
import {InteractService} from "../../services/interact.service";
import {StateService} from "../../services/state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'cardcomponent',
  templateUrl: './card.component.html',
  styleUrls: ['../../css/card.css',
              '../../app.component.css',
              '../../css/ui.element.css'],
})

export class CardComponent implements OnInit {

  currentCard: Card = new Card();
  @ViewChild("qMp3", {read: ElementRef}) currentQMp3: ElementRef;
  @ViewChild("aMp3", {read: ElementRef}) currentAMp3: ElementRef;
  editMode = false;
  isShowFieldQInfo: boolean = false;
  isShowFieldAAudio: boolean = false;
  isShowFieldAInfo: boolean = false;
  isShowFieldImage: boolean = false;

  constructor(private appService: AppHttpService,
              private router: Router,
              private interactService: InteractService,
              private stateService: StateService){

    this.interactService.getObservableCard().subscribe(
      data => {
        this.currentCard = (data == null)? new Card() : data;
        this.currentQMp3.nativeElement.src = 'data:audio/mp3;base64,' + this.currentCard.qAudio;
      }
    );
    this.interactService.getObservableTag().subscribe(
      data => {
        this.addTagToCard(data);
      }
    );
  }

  ngOnInit(): void {
    this.currentCard = this.stateService.getCurrentCard();
    this.currentQMp3.nativeElement.src = 'data:audio/mp3;base64,' + this.currentCard.qAudio;
    this.currentCard.section = this.stateService.getCurrentSection();
  }

  saveCardForm() : void {
    var formData: FormData = new FormData();
    if(this.currentCard.id != null){
      formData.append("id", this.currentCard.id.toString());
    }
    formData.append("question", this.currentCard.question);
    formData.append("qInfo", this.currentCard.qInfo);
    formData.append("answer", this.currentCard.answer);
    formData.append("aInfo", this.currentCard.aInfo);
    formData.append("section.id", this.currentCard.section.id.toString());
    if(this.currentCard.qAudio !== undefined && this.currentCard.qAudio != null){
      formData.append("qAudioFile", this.currentCard.qAudio, this.currentCard.qAudio.name);
    }
    if(this.currentCard.aAudio !== undefined && this.currentCard.aAudio != null){
      formData.append("aAudioFile", this.currentCard.aAudio, this.currentCard.aAudio.name);
    }
    if(this.currentCard.cardImage !== undefined && this.currentCard.cardImage != null){
      formData.append("cardImageFile", this.currentCard.cardImage, this.currentCard.cardImage.name);
    }
    if(this.currentCard.tags != null && this.currentCard.tags.length > 0){
      for(var i = 0; i < this.currentCard.tags.length; i++){
        formData.append("tags["+ i +"].id", this.currentCard.tags[i].id.toString());
      }
    }
    //JSON.stringify(this.currentCard.tags));

    this.appService.saveOrUpdateCard(formData)
      .subscribe(
        data => {
          console.log('saved Card id: ' + data);
          this.interactService.sendUpdateCardList(true);
          this.router.navigateByUrl('/cardedit');
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        }
      )
  }

  changeQuestionFile(fileInputElement : HTMLInputElement){
    this.currentCard.qAudio = fileInputElement.files[0];
    var reader:FileReader = new FileReader();
    reader.onloadend = (e) => {
      this.currentQMp3.nativeElement.src = reader.result;
      this.currentQMp3.nativeElement.play();
    };
    reader.readAsDataURL(this.currentCard.qAudio);
  }

  changeAnswerFile(fileInputElement : HTMLInputElement){
    this.currentCard.aAudio = fileInputElement.files[0];
    var reader:FileReader = new FileReader();
    reader.onloadend = (e) => {
      this.currentAMp3.nativeElement.src = reader.result;
      this.currentAMp3.nativeElement.play();
    };
    reader.readAsDataURL(this.currentCard.aAudio);
  }

  changeCardImage(fileInputElement : HTMLInputElement){
    this.currentCard.cardImage = fileInputElement.files[0];
    console.log(fileInputElement.name);
  }

  deleteTagFromCard(cardtag){
    var index = 0;
    for(var i = 0; i < this.currentCard.tags[i].id; i++){
      if(this.currentCard.tags[i].id == cardtag.id) {
        index = i;
        break;
      }
    };
    this.currentCard.tags.splice(index, 1);
  }

  addTagToCard(cardtag){
    console.log(this.currentCard);
    if(this.currentCard.tags == null){
      this.currentCard.tags = new Array();
    }
    var isInList = false;
    for(var i = 0; i < this.currentCard.tags.length; i++){
      console.log(i + ' - ' + this.currentCard.tags[i].id);
      if(this.currentCard.tags[i].id == cardtag.id) {
        isInList = true;
        break;
      }
    }
    if(cardtag.id > 0 && !isInList){
      this.currentCard.tags.push(cardtag);
    }
  }

  setEditMode(flag : boolean){
    this.editMode = flag;
  }

  closeCardForm() {
    this.router.navigateByUrl('/cardedit');
  }

  newCardForm() : void {
    this.currentCard = new Card();
    this.currentCard.section = this.stateService.getCurrentSection();
    this.stateService.setCurrentCard(this.currentCard);
  }

  showQInfoField() : void {
    this.isShowFieldQInfo = !this.isShowFieldQInfo;
  }

  showAInfoField() : void {
    this.isShowFieldAInfo = !this.isShowFieldAInfo;
  }

  showAAudioField() : void {
    this.isShowFieldAAudio = !this.isShowFieldAAudio;
  }

  showImageField() : void {
    this.isShowFieldImage = !this.isShowFieldImage;
  }
}
