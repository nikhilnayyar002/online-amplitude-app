import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageModule } from './page/page.module';
import { PageSwitchDirective } from './page-switch.directive';
import { McqsComponent } from './page/mcqs/mcqs.component';
import { QuestionsComponent } from './page/questions/questions.component';
import { InstructionsComponent } from './page/instructions/instructions.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { StoreModule } from '@ngrx/store';
import * as TestReducer from './state/state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TestEffect } from './state/state.effects';

@NgModule({
  declarations: [
    AppComponent,
    PageSwitchDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageModule,
    ComponentsModule,
    SharedModule,
    HttpClientModule,

    /*
      InMemoryWebApi Configer
    */
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService
    ),
    /**
     * Store (two states): test(Test), index(number)
     */
    StoreModule.forRoot({test: TestReducer.tReducer, index:TestReducer.Ireducer}),
    /**
     * Effects
     */
    EffectsModule.forRoot([TestEffect])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[McqsComponent,QuestionsComponent,InstructionsComponent]
})
export class AppModule { }
