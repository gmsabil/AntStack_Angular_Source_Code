import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReadCSVDataComponent } from './read-csvdata/read-csvdata.component';

import { FilterPipe } from './read-csvdata/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReadCSVDataComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
