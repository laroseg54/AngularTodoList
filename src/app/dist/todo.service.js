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
exports.TodoService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var TodoService = /** @class */ (function () {
    function TodoService() {
        this.todoListSubject = new rxjs_1.BehaviorSubject({ label: 'TodoList', items: [] });
    }
    TodoService.prototype.getTodoListDataObservable = function () {
        return this.todoListSubject.asObservable();
    };
    TodoService.prototype.update = function (todo) {
        this.todoListSubject.next({
            label: todo.label,
            items: todo.items
        });
    };
    TodoService.prototype.setItemsLieu = function (lieu, longitude, latitude) {
        var items = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            items[_i - 3] = arguments[_i];
        }
        var tdl = this.todoListSubject.getValue();
        this.todoListSubject.next({
            label: tdl.label,
            items: tdl.items.map(function (I) { return items.indexOf(I) === -1 ? I : ({ label: I.label, isDone: I.isDone, lieu: lieu, longitude: longitude, latitude: latitude }); })
        });
    };
    TodoService.prototype.setItemsLabel = function (label) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        var tdl = this.todoListSubject.getValue();
        this.todoListSubject.next({
            label: tdl.label,
            items: tdl.items.map(function (I) { return items.indexOf(I) === -1 ? I : ({ label: label, isDone: I.isDone, lieu: "" }); })
        });
    };
    TodoService.prototype.setItemsDone = function (isDone) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        var tdl = this.todoListSubject.getValue();
        this.todoListSubject.next({
            label: tdl.label,
            items: tdl.items.map(function (I) { return items.indexOf(I) === -1 ? I : ({ label: I.label, isDone: isDone, lieu: "" }); })
        });
    };
    TodoService.prototype.appendItems = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var tdl = this.todoListSubject.getValue();
        this.todoListSubject.next({
            label: tdl.label,
            items: __spreadArrays(tdl.items, items)
        });
    };
    TodoService.prototype.removeItems = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var tdl = this.todoListSubject.getValue();
        this.todoListSubject.next({
            label: tdl.label,
            items: tdl.items.filter(function (I) { return items.indexOf(I) === -1; })
        });
    };
    TodoService = __decorate([
        core_1.Injectable()
    ], TodoService);
    return TodoService;
}());
exports.TodoService = TodoService;
