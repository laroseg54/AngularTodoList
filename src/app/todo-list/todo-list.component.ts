import { Component, OnInit } from '@angular/core';
import { TodoListData } from '../dataTypes/TodoListData';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {

    private todoList: TodoListData;
     filtre: "all" | "active" | "completed";



    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe(tdl => this.todoList = tdl);
        //this.filtre = "all";
    }


    get label(): string {
        return this.todoList.label;
    }


    get items(): TodoItemData[] {
        return this.todoList.items;
    }

    get itemsNotDone(): TodoItemData[] {
        return this.items.filter(i => !i.isDone);
    }

    get itemsDone(): TodoItemData[] {
        return this.items.filter(i => i.isDone);
    }


    filterItems() : TodoItemData[]{
        if (this.filtre == "all") {
            return this.todoList.items;
        }
        if (this.filtre == "completed") {
            return this.itemsDone;
        }
        if (this.filtre == "active") {
            return this.itemsNotDone;
        }
        return this.todoList.items;
    }

    appendItem(label: string) {

        if(label){
            this.todoService.appendItems({ label, isDone: false });
        }
    }

    itemDone(item: TodoItemData, done: boolean) {
        this.todoService.setItemsDone(done, item);
    }

    itemLabel(item: TodoItemData, label: string) {
        this.todoService.setItemsLabel(label, item);
    }

    itemDelete(item: TodoItemData) {
        this.todoService.removeItems(item);
    }

    toggleAll(){
        if(this.itemsNotDone.length===0 ){
            this.todoService.setItemsDone(false,...this.items);
        }
        else{
            this.todoService.setItemsDone(true,...this.itemsNotDone);
        }
    }

    removeAll(items : TodoItemData[]){
       
            this.todoService.removeItems(...items);
        
    }

    ngOnInit() {
    }


}
