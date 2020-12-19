import { Component, ElementRef, EventEmitter, Host, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() private todoItem: TodoItemData;
  @ViewChild("newTextInput", { static: false }) labelInput: ElementRef;
  @ViewChild("lieuInput", { static: false }) adresseInput: ElementRef;
  @Output() deleteEvent = new EventEmitter<TodoItemData>();
  @Output() labelEvent = new EventEmitter<{ lbl: string, data: TodoItemData }>();
  @Output() doneEvent = new EventEmitter<{ b: boolean, data: TodoItemData }>();
  @Output() lieuEvent = new EventEmitter<TodoItemData>();
  private edition: boolean;
  private editionLieu: boolean;


  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){}
  

  get label(): string {
    return this.todoItem.label;
  }
  set label(val: string) {
    if (val !== this.todoItem.label) {
      this.todoItem.label = val;
      this.labelEvent.emit({ lbl: val, data: this.todoItem });
    }
    this.edition = false;

  }

  get lieu(): string {
    return this.todoItem.lieu;
  }
  set lieu(val: string) {
    this.todoItem.lieu = val;
  
  }


  get itemData(): TodoItemData {
    return this.todoItem;
  }

  get edit(): boolean {
    return this.edition;
  }

  set edit(val: boolean) {
    this.edition = val;
  }

  get editLieu(): boolean {
    return this.editionLieu;
  }

  set editLieu(val: boolean) {
    this.editionLieu = val;


  }


  delete() {
    this.deleteEvent.emit(this.todoItem);
  }



  ngOnInit() {
       this.mapsAPILoader.load().then(() => {
  
      let autocomplete = new google.maps.places.Autocomplete(this.adresseInput.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.lieu = place.name;
   
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.todoItem.latitude = place.geometry.location.lat();
          this.todoItem.longitude = place.geometry.location.lng();
        });
      });
    });
  }

}
