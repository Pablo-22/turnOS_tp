import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  dataSource:any[] = []

  @Input()
  columns:string[] = []

  @Input()
  columnsDisplayName:string[] = []

  @ViewChild('excelTable') childId!:ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
}
