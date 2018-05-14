
import {Component, ElementRef, ViewChild} from "@angular/core";
import {Card} from "../../model/Card";
import {AppHttpService} from "../../services/apphttp.service";
import {HttpErrorResponse} from "@angular/common/http";
import {InteractService} from "../../services/interact.service";

@Component({
  selector: 'cardform',
  templateUrl: './cardform.component.html',
  styleUrls: ['../../css/form.component.css'],
})

export class CardFormComponent {

  currentCard: Card = new Card();
  @ViewChild("qMp3", {read: ElementRef}) currentQMp3: ElementRef;
  editMode = false;

  constructor(private appService: AppHttpService, private interactService: InteractService){
    this.interactService.getObservableCard().subscribe(
      data => {
        this.currentCard = (data == null)? new Card() : data;
        this.currentQMp3.nativeElement.src = 'data:audio/mp3;base64,' + this.currentCard.qAudio;
      }
    )
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
    // formData.append("section", JSON.stringify(this.currentCard.section));
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

    this.appService.saveOrUpdateCard(formData)
      .subscribe(
        data => {
          console.log('saved Card id: ' + data);
          this.interactService.sendUpdateCardList(true);
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
    console.log(fileInputElement.name);
    var reader:FileReader = new FileReader();
    reader.onloadend = (e) => {
      this.currentQMp3.nativeElement.src = reader.result;
      this.currentQMp3.nativeElement.play();
    };
    reader.readAsDataURL(this.currentCard.qAudio);
  }

  changeAnswerFile(fileInputElement : HTMLInputElement){
    this.currentCard.aAudio = fileInputElement.files[0];
    console.log(fileInputElement.name)
  }

  changeCardImage(fileInputElement : HTMLInputElement){
    this.currentCard.cardImage = fileInputElement.files[0];
    console.log(fileInputElement.name)
  }

}
