"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TodoItemComponent = void 0;
var core_1 = require("@angular/core");
var TodoItemComponent = /** @class */ (function () {
    function TodoItemComponent(mapsAPILoader, ngZone) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.deleteEvent = new core_1.EventEmitter();
        this.labelEvent = new core_1.EventEmitter();
        this.doneEvent = new core_1.EventEmitter();
        this.lieuEvent = new core_1.EventEmitter();
    }
    Object.defineProperty(TodoItemComponent.prototype, "label", {
        get: function () {
            return this.todoItem.label;
        },
        set: function (val) {
            if (val !== this.todoItem.label) {
                this.todoItem.label = val;
                this.labelEvent.emit({ lbl: val, data: this.todoItem });
            }
            this.edition = false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoItemComponent.prototype, "lieu", {
        get: function () {
            return this.todoItem.lieu;
        },
        set: function (val) {
            this.todoItem.lieu = val;
            this.lieuEvent.emit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoItemComponent.prototype, "itemData", {
        get: function () {
            return this.todoItem;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoItemComponent.prototype, "edit", {
        get: function () {
            return this.edition;
        },
        set: function (val) {
            this.edition = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoItemComponent.prototype, "editLieu", {
        get: function () {
            return this.editionLieu;
        },
        set: function (val) {
            this.editionLieu = val;
        },
        enumerable: false,
        configurable: true
    });
    TodoItemComponent.prototype["delete"] = function () {
        this.deleteEvent.emit(this.todoItem);
    };
    TodoItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.adresseInput.nativeElement);
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    var place = autocomplete.getPlace();
                    _this.lieu = place.name;
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    _this.todoItem.latitude = place.geometry.location.lat();
                    _this.todoItem.longitude = place.geometry.location.lng();
                });
            });
        });
    };
    __decorate([
        core_1.Input()
    ], TodoItemComponent.prototype, "todoItem");
    __decorate([
        core_1.ViewChild("newTextInput", { static: false })
    ], TodoItemComponent.prototype, "labelInput");
    __decorate([
        core_1.ViewChild("lieuInput", { static: false })
    ], TodoItemComponent.prototype, "adresseInput");
    __decorate([
        core_1.Output()
    ], TodoItemComponent.prototype, "deleteEvent");
    __decorate([
        core_1.Output()
    ], TodoItemComponent.prototype, "labelEvent");
    __decorate([
        core_1.Output()
    ], TodoItemComponent.prototype, "doneEvent");
    __decorate([
        core_1.Output()
    ], TodoItemComponent.prototype, "lieuEvent");
    TodoItemComponent = __decorate([
        core_1.Component({
            selector: 'app-todo-item',
            templateUrl: './todo-item.component.html',
            styleUrls: ['./todo-item.component.css']
        })
    ], TodoItemComponent);
    return TodoItemComponent;
}());
exports.TodoItemComponent = TodoItemComponent;
