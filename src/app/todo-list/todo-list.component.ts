import { Component, OnInit } from '@angular/core';
import { TodoListData } from '../dataTypes/TodoListData';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../todo.service';
import { LocalStorageService } from '../localStorageService';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {

    private todoList: TodoListData;
    private undoRedo: TodoListData[] = [];
    private indiceUndoRedo: number = 0;
    filtre: "all" | "active" | "completed";



    constructor(private todoService: TodoService,private localStorageService: LocalStorageService) {
        todoService.getTodoListDataObservable().subscribe(tdl => this.todoList = tdl);
        let td: TodoListData = localStorageService.loadFromLocalStorage()
        if(td){
            todoService.update(td);
        }
        this.undoRedo.push(JSON.parse(JSON.stringify(this.todoList)));
        
        //this.filtre = "all";
    }

    get indiceUR() : number{
        return this.indiceUndoRedo;
    }
    get redoPossible() : boolean{
        return this.undoRedo.length-1!==this.indiceUndoRedo;
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


    filterItems(): TodoItemData[] {
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

        if (label) {
            this.todoService.appendItems({ label, isDone: false,lieu: ""  });
            this.undoRedoSave();
        }
    }

    itemDone(item: TodoItemData, done: boolean) {

        this.todoService.setItemsDone(done, item);
        this.undoRedoSave();
    }

    itemLabel(item: TodoItemData, label: string) {

        this.todoService.setItemsLabel(label, item);
        this.undoRedoSave();
    }

    itemDelete(item: TodoItemData) {

        this.todoService.removeItems(item);
        this.undoRedoSave();
    }

    toggleAll() {

        if (this.itemsNotDone.length === 0) {
            this.todoService.setItemsDone(false, ...this.items);
        }
        else {
            this.todoService.setItemsDone(true, ...this.itemsNotDone);
        }
        this.undoRedoSave();
    }

    removeAll(items: TodoItemData[]) {

        this.todoService.removeItems(...items);
        this.undoRedoSave();

    }
    undoRedoSave() {
        if (this.indiceUndoRedo !== this.undoRedo.length - 1) {
         
            while (this.indiceUndoRedo !== this.undoRedo.length - 1) {
                this.undoRedo.pop();
            }

        }
        this.undoRedo.push(JSON.parse(JSON.stringify(this.todoList)));
        this.indiceUndoRedo++;
        this.localStorageService.storeOnLocalStorage(this.todoList);
    }
    undo() {

        if (this.indiceUndoRedo > 0) {
            this.indiceUndoRedo--;
            this.todoService.update(JSON.parse(JSON.stringify(this.undoRedo[this.indiceUndoRedo])));
            this.localStorageService.storeOnLocalStorage(this.todoList);
        }
    }

    redo() {
        if (this.indiceUndoRedo < this.undoRedo.length - 1) {
            ++this.indiceUndoRedo;
            this.todoService.update(JSON.parse(JSON.stringify(this.undoRedo[this.indiceUndoRedo])));
            this.localStorageService.storeOnLocalStorage(this.todoList);

        }

    }


    ngOnInit() {
    }


}
