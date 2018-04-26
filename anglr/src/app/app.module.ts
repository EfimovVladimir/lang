import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";

import { SectionListComponent } from "./components/section/sectionlist.component";
import { AppHttpService} from "./services/apphttp.service"

@NgModule({
  declarations: [
    AppComponent,
    SectionListComponent
  ],
  imports: [
    BrowserModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
    HttpClientModule
  ],
  providers: [AppHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
