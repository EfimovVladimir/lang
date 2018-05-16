import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
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
    TagEditComponent
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
        }
    ])
  ],
  providers: [AppHttpService, InteractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
