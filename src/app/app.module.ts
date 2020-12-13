import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {TodoService} from './todo.service';
import {FormsModule} from '@angular/forms';
import { LocalStorageService } from './localStorageService';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule, FormsModule,AgmCoreModule.forRoot({apiKey:'AIzaSyDkDM5CCdMcbnTHesqNkwguLWIUsWh-x3Q'})
  ],
  
  providers: [TodoService,LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
