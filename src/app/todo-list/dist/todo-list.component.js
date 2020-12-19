"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.TodoListComponent = void 0;
var core_1 = require("@angular/core");
var TodoListComponent = /** @class */ (function () {
    function TodoListComponent(todoService, localStorageService) {
        var _this = this;
        this.todoService = todoService;
        this.localStorageService = localStorageService;
        this.undoRedo = [];
        this.indiceUndoRedo = 0;
        todoService.getTodoListDataObservable().subscribe(function (tdl) { return _this.todoList = tdl; });
        var td = localStorageService.loadFromLocalStorage();
        if (td) {
            todoService.update(td);
        }
        this.undoRedo.push(JSON.parse(JSON.stringify(this.todoList)));
        //this.filtre = "all";
    }
    Object.defineProperty(TodoListComponent.prototype, "indiceUR", {
        get: function () {
            return this.indiceUndoRedo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoListComponent.prototype, "redoPossible", {
        get: function () {
            return this.undoRedo.length - 1 !== this.indiceUndoRedo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoListComponent.prototype, "label", {
        get: function () {
            return this.todoList.label;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoListComponent.prototype, "items", {
        get: function () {
            return this.todoList.items;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoListComponent.prototype, "itemsNotDone", {
        get: function () {
            return this.items.filter(function (i) { return !i.isDone; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoListComponent.prototype, "itemsDone", {
        get: function () {
            return this.items.filter(function (i) { return i.isDone; });
        },
        enumerable: false,
        configurable: true
    });
    TodoListComponent.prototype.filterItems = function () {
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
    };
    TodoListComponent.prototype.appendItem = function (label) {
        if (label) {
            this.todoService.appendItems({ label: label, isDone: false, lieu: "" });
            this.undoRedoSave();
        }
    };
    TodoListComponent.prototype.itemDone = function (item, done) {
        this.todoService.setItemsDone(done, item);
        this.undoRedoSave();
    };
    TodoListComponent.prototype.itemLabel = function (item, label) {
        this.todoService.setItemsLabel(label, item);
        this.undoRedoSave();
    };
    TodoListComponent.prototype.itemDelete = function (item) {
        this.todoService.removeItems(item);
        this.undoRedoSave();
    };
    TodoListComponent.prototype.itemLieu = function (item) {
        this.todoService.setItemsLieu(item.lieu, item.longitude, item.latitude, item);
        this.undoRedoSave();
    };
    TodoListComponent.prototype.toggleAll = function () {
        var _a, _b;
        if (this.itemsNotDone.length === 0) {
            (_a = this.todoService).setItemsDone.apply(_a, __spreadArrays([false], this.items));
        }
        else {
            (_b = this.todoService).setItemsDone.apply(_b, __spreadArrays([true], this.itemsNotDone));
        }
        this.undoRedoSave();
    };
    TodoListComponent.prototype.removeAll = function (items) {
        var _a;
        (_a = this.todoService).removeItems.apply(_a, items);
        this.undoRedoSave();
    };
    TodoListComponent.prototype.undoRedoSave = function () {
        if (this.indiceUndoRedo !== this.undoRedo.length - 1) {
            while (this.indiceUndoRedo !== this.undoRedo.length - 1) {
                this.undoRedo.pop();
            }
        }
        this.undoRedo.push(JSON.parse(JSON.stringify(this.todoList)));
        this.indiceUndoRedo++;
        this.localStorageService.storeOnLocalStorage(this.todoList);
    };
    TodoListComponent.prototype.undo = function () {
        if (this.indiceUndoRedo > 0) {
            this.indiceUndoRedo--;
            this.todoService.update(JSON.parse(JSON.stringify(this.undoRedo[this.indiceUndoRedo])));
            this.localStorageService.storeOnLocalStorage(this.todoList);
        }
    };
    TodoListComponent.prototype.redo = function () {
        if (this.indiceUndoRedo < this.undoRedo.length - 1) {
            ++this.indiceUndoRedo;
            this.todoService.update(JSON.parse(JSON.stringify(this.undoRedo[this.indiceUndoRedo])));
            this.localStorageService.storeOnLocalStorage(this.todoList);
        }
    };
    TodoListComponent.prototype.showInfo = function () {
        this.show = true;
    };
    TodoListComponent.prototype.hideInfo = function () {
        this.show = false;
    };
    Object.defineProperty(TodoListComponent.prototype, "CurrentLocation", {
        // fonction pour centrer la carte sur la position de l'utilisateur au démarrage l'appli mais ça ne fonctionne pas je ne sais pas pourquoi , o est bien mis
        // à jour mais sa valeur ne semble pas être renvoyée
        get: function () {
            var o = { latitude: 45.1667, longitude: 5.7167 };
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    o.latitude = position.coords.latitude;
                    o.longitude = position.coords.longitude;
                    console.log(o);
                    return o;
                });
            }
            return o;
        },
        enumerable: false,
        configurable: true
    });
    TodoListComponent.prototype.ngOnInit = function () {
        var o = this.CurrentLocation;
        this.latitude = o.latitude;
        this.longitude = o.longitude;
    };
    TodoListComponent = __decorate([
        core_1.Component({
            selector: 'app-todo-list',
            templateUrl: './todo-list.component.html',
            styleUrls: ['./todo-list.component.css']
        })
    ], TodoListComponent);
    return TodoListComponent;
}());
exports.TodoListComponent = TodoListComponent;
