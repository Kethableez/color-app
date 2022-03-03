import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ColorComponent } from './main/forms/color/color.component';
import { FilterComponent } from './main/forms/filter/filter.component';
import { ListComponent } from './main/components/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorBoxComponent } from './main/components/color-box/color-box.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ColorComponent,
    FilterComponent,
    ListComponent,
    ColorBoxComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
