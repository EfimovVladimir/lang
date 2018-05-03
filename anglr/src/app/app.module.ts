import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { SectionListComponent } from "./components/section/sectionlist.component";
import { SectionFormComponent} from "./components/section/sectionform.component";
import { CardFormComponent} from "./components/card/cardform.component";
import { AppHttpService } from "./services/apphttp.service";
import { InteractService } from "./services/interact.service";

@NgModule({
  declarations: [
    AppComponent,
    SectionListComponent,
    SectionFormComponent,
    CardFormComponent
  ],
  imports: [
    BrowserModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
        {
          path: 'sectionForm',
          component: SectionFormComponent
        }
    ])
  ],
  providers: [AppHttpService, InteractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
