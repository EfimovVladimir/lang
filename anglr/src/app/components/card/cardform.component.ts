
import {Component} from "@angular/core";
import {Card} from "../../model/Card";
import {AppHttpService} from "../../services/apphttp.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'cardform',
  templateUrl: './cardform.component.html',
  styleUrls: ['../../css/form.component.css'],
})

export class CardFormComponent {

  currentCard: Card = new Card();

  constructor(private appService: AppHttpService){

  }

  executeCardForm() : void {
    var formData: FormData = new FormData();
    formData.append("question", this.currentCard.question);
    formData.append("qInfo", this.currentCard.qInfo);
    formData.append("answer", this.currentCard.answer);
    formData.append("aInfo", this.currentCard.aInfo);
    formData.append("sectionId", this.currentCard.sectionId.toString());
    if(this.currentCard.qAudio !== undefined){
      formData.append("qAudioFile", this.currentCard.qAudio, this.currentCard.qAudio.name);
    }
    if(this.currentCard.aAudio !== undefined){
      formData.append("aAudioFile", this.currentCard.aAudio, this.currentCard.aAudio.name);
    }
    if(this.currentCard.cardImage !== undefined){
      formData.append("cardImageFile", this.currentCard.cardImage, this.currentCard.cardImage.name);
    }

    this.appService.saveCardForm(formData)
      .subscribe(
        data => {
          console.log('saved Card id: ' + data);
          // this.interactService.sendUpdateList(true);
          // this.clearSectionForm();
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
    console.log(fileInputElement.name)
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
