import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { TodoListData } from './dataTypes/TodoListData';

const STORAGE_KEY = 'local_todolist';

@Injectable()
export class LocalStorageService {

     constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
     public storeOnLocalStorage(todoList: TodoListData): void {

          this.storage.set(STORAGE_KEY, todoList);

     }

     public loadFromLocalStorage() : TodoListData{

         return this.storage.get(STORAGE_KEY);
     }
}
