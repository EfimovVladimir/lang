
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Card} from "../../model/Card";
import {StateService} from "../../services/state.service";
import {Lesson} from "../../model/Lesson";
import {AppHttpService} from "../../services/apphttp.service";
import {LessonCard} from "../../model/LessonCard";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'cardQuestion',
  templateUrl: './cardquestion.component.html',
  styleUrls: ['../../css/ui.element.css', '../../css/question.css']
})

export class CardQuestionComponent implements AfterViewInit, OnInit {

  currentIndex = 0;
  currentStatus: string = '';
  currentLessonCard: LessonCard = new LessonCard();
  currentAnswer: String = "";
  isShowContext: boolean = false;
  @ViewChild("answerId", {read: ElementRef}) answerElement: ElementRef;
  @ViewChild("engMp3", {read: ElementRef}) currentEngMp3: ElementRef;
  lessonCardList: LessonCard[];

  constructor(private stateService: StateService,
              private appHttpService : AppHttpService,
              private router : Router){
    this.currentLessonCard.lessonCardId.lesson = stateService.getCurrentLesson();
    this.getLessonCardsToStartLesson(this.currentLessonCard.lessonCardId.lesson);
  }

  ngOnInit(): void {
    this.currentLessonCard.lessonCardId.lesson = this.stateService.getCurrentLesson();
  }

  ngAfterViewInit(): void {
    this.answerElement.nativeElement.focus();
  }

  getLessonCardsToStartLesson(lesson) : void {
    if(lesson != null) {
      this.appHttpService.getLessonCardListToStartLesson(lesson).subscribe(
        (data) => {
          console.log(data);
          this.lessonCardList = this.shuffleArray(data);
          this.nextCard();
        }
      )
    }
    else {
      this.lessonCardList = new Array();
    }
  }

  nextCard() : void {
    if(this.lessonCardList.length <= 0){
      this.router.navigate(['/lessonedit']);
      return;
    }
    this.currentAnswer = '';
    this.currentStatus = '';
    this.currentIndex += 1;
    if(this.currentIndex >= this.lessonCardList.length){
      this.currentIndex = 0;
    }
    console.log('this.currentIndex=' + this.currentIndex);
    this.currentLessonCard = this.lessonCardList[this.currentIndex];
    if(this.currentLessonCard.lesson.questionField == 0){
      this.currentEngMp3.nativeElement.src = 'data:audio/mp3;base64,' + this.currentLessonCard.card.qAudio;
    }
    else {
      this.currentEngMp3.nativeElement.src = 'data:audio/mp3;base64,' + this.currentLessonCard.card.aAudio;
    }
    this.currentEngMp3.nativeElement.play();
    this.answerElement.nativeElement.focus();
  }

  checkCard() : void {
    console.log('this.answer.length=' + this.currentAnswer.length);
    if(this.currentAnswer.length == 0){
      return;
    }
    if(this.currentAnswer.trim().length < 2){
      return;
    }
    let answerStr = this.currentAnswer.toLowerCase().trim();
    let symbolsA = answerStr.split(""); // разбиваем на массив символов
    let symbolsQ = this.getSymbolsAnswer();
    let i: number = 0;
    let result: boolean = false;
    for(i=0; i < symbolsA.length && i < symbolsQ.length; i++){
      result = (symbolsA[i] == symbolsQ[i]);
      if(!result){
        break;
      }
    }

    if(result){
      this.successCard();
    }else{
      this.failCard();
    }
  }

  getSymbolsAnswer(){
    if(this.currentLessonCard.lesson.questionField == 0) {
      return this.currentLessonCard.card.answer.toLowerCase().trim().split("");
    }
    else{
      return this.currentLessonCard.card.question.toLowerCase().trim().split("");
    }
  }

  getAnswerSymbols() : string[] {
    if(this.currentLessonCard.lesson.questionField == 1){
      return this.currentAnswer.toLowerCase().trim().split("");
    }
    return this.currentAnswer.toLowerCase().trim().split("");
  }


  answerKeyHandler(event) {
    if(this.currentStatus.length > 1){
      this.nextCard();
    }
    this.checkCard();
    console.log(event, event.keyCode);
  }

  successCard() : void {
    this.currentLessonCard.successCount += 1;
    this.lessonCardList[this.currentIndex].successCount = this.currentLessonCard.successCount;
    this.updateCardForm(this.lessonCardList[this.currentIndex]);
    this.currentStatus = 'SUCCESS';
    if(this.currentLessonCard.successCount >= this.currentLessonCard.targetCount){
      this.lessonCardList.splice(this.currentIndex, 1);
    }
  }

  failCard() : void {
    this.currentLessonCard.failedCount += 1;
    this.lessonCardList[this.currentIndex].failedCount += this.currentLessonCard.failedCount;
    this.updateCardForm(this.lessonCardList[this.currentIndex]);
    this.currentStatus = 'FAILED';
  }

  shuffleArray(array: LessonCard[]) : LessonCard[] {
    let randomIndex: number;
    let i: number = array.length;
    let tmp: LessonCard;
    while(0 !== i){
      randomIndex = Math.floor(Math.random() * i);
      i -= 1;
      tmp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = tmp;
      console.log('[' + i + ']=' + array[i].card.id);
    }
    return array;
  }

  excutePlay(myaudio : HTMLAudioElement) : void {
    myaudio.play();
  }

  updateCardForm(lessonCard : LessonCard) : void {
    this.appHttpService.saveOrUpdateLessonCardForm(lessonCard)
      .subscribe(
        data => {
          console.log('saved idLesson id: ' + data);
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

  showContext() : void {
    this.isShowContext = !this.isShowContext;
  }

}
