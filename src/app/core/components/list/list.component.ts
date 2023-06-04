import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  @Input() dataSource:any[] = []
  @Input() propertyToList:string = ''

  selectedItem:any
  @Output() itemSelected = new EventEmitter<any>(); 

  constructor() { }

  ngOnInit(): void {
  }

  onItemSelected(item:any){
    this.selectedItem = item
    this.itemSelected.emit(item)
  }

  reset(){
    this.selectedItem = undefined
  }

}
