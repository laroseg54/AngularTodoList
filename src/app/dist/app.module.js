"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var todo_list_component_1 = require("./todo-list/todo-list.component");
var todo_item_component_1 = require("./todo-item/todo-item.component");
var todo_service_1 = require("./todo.service");
var forms_1 = require("@angular/forms");
var localStorageService_1 = require("./localStorageService");
var core_2 = require("@agm/core");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                todo_list_component_1.TodoListComponent,
                todo_item_component_1.TodoItemComponent
            ],
            imports: [
                platform_browser_1.BrowserModule, forms_1.FormsModule, core_2.AgmCoreModule.forRoot({ apiKey: '', libraries: ['places'] })
            ],
            providers: [todo_service_1.TodoService, localStorageService_1.LocalStorageService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
