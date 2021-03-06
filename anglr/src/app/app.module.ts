import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { SectionListComponent } from "./components/section/sectionlist.component";
import { SectionFormComponent} from "./components/section/sectionform.component";
import { CardFormComponent} from "./components/card/cardform.component";
import { CardListComponent} from "./components/card/cardlist.component";
import { AppHttpService } from "./services/apphttp.service";
import { InteractService } from "./services/interact.service";
import {SectionEditComponent} from "./components/section/sectionedit.component";
import {CardEditComponent} from "./components/card/cardedit.component";
import {TagFormComponent} from "./components/tag/tagform.component";
import {TagListComponent} from "./components/tag/taglist.component";
import {TagEditComponent} from "./components/tag/tagedit.component";
import {LessonFormComponent} from "./components/lesson/lessonform.component";
import {LessonListComponent} from "./components/lesson/lessonlist.component";
import {LessonEditComponent} from "./components/lesson/lessonedit.component";
import {LessonCardListComponent} from "./components/lessoncard/lessoncardlist.component";
import {CurrentStateHeaderComponent} from "./components/state/currentstateheader.component";
import {LessonCardFormComponent} from "./components/lessoncard/lessoncardform.component";
import {LessonCardEditComponent} from "./components/lessoncard/lessoncardedit.component";
import {CardViewComponent} from "./components/card/cardview.component";
import {CardQuestionComponent} from "./components/card/cardquestion.component";
import {CardListForLessonComponent} from "./components/lesson/lesson.cardlist.component";
import {StateService} from "./services/state.service";
import {PagerService} from "./services/pager.service";
import {PagerComponent} from "./components/pager/pager.component";
import {CardComponent} from "./components/card/card.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthService} from "./services/auth.service";
import {Interceptor} from "./services/interceptor";
import {TokenStorage} from "./services/token.storage";
import {UserFormComponent} from "./components/user/userform.component";
import {UserListComponent} from "./components/user/userlist.component";
import {UserEditComponent} from "./components/user/useredit.component";

@NgModule({
  declarations: [
    AppComponent,
    SectionListComponent,
    SectionFormComponent,
    SectionEditComponent,
    CardFormComponent,
    CardListComponent,
    CardEditComponent,
    TagFormComponent,
    TagListComponent,
    TagEditComponent,
    LessonFormComponent,
    LessonListComponent,
    LessonEditComponent,
    LessonCardListComponent,
    LessonCardFormComponent,
    LessonCardEditComponent,
    CurrentStateHeaderComponent,
    CardViewComponent,
    CardQuestionComponent,
    CardListForLessonComponent,
    PagerComponent,
    CardComponent,
    LoginComponent,
    UserFormComponent,
    UserListComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
        {
          path: 'sectionedit',
          component: SectionEditComponent
        },
        {
          path: 'cardedit',
          component: CardEditComponent
        },
        {
          path: 'tagedit',
          component: TagEditComponent
        },
        {
          path: 'useredit',
          component: UserEditComponent
        },
        {
          path: 'lessonedit',
          component: LessonEditComponent
        },
        {
          path: 'lessonCardEdit',
          component: LessonCardEditComponent
        },
        {
          path: 'cardQuestion',
          component: CardQuestionComponent
        },
        {
          path: 'cardComponent',
          component: CardComponent
        },
        {
          path: 'loginComponent',
          component: LoginComponent
        }
    ])
  ],
  providers: [
    AppHttpService,
    InteractService,
    StateService,
    PagerService,
    AuthService,
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
