import {Component, ElementRef, EventEmitter, Host, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TodoItemData} from '../dataTypes/TodoItemData';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() private todoItem : TodoItemData;
  @ViewChild("newTextInput",{static:false}) labelInput : ElementRef;
  @Output() deleteEvent = new EventEmitter<TodoItemData>();
  private edition : boolean;


  constructor() { 
   
  }

  get label(): string {
    return this.todoItem.label;
}
  set label(val : string){
    this.todoItem.label = val;
    this.edition = false;
  }

  get itemData() : TodoItemData{
    return this.todoItem;
  }

  get edit() : boolean{
    return this.edition;
  }
  
  set edit(val : boolean){
    this.edition = val;
  }
  

  delete() {
    this.deleteEvent.emit(this.todoItem);
  }
  
 
  ngOnInit() {
  }

}
