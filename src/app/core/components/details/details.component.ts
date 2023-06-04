import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() data: any;
  @Input() title: string = ''
  @Input() imageSrc: string = ''
  @Input() width: number = 500
  imageStyle: string = ''

  @Input() keys: string[] = []
  @Input() values: string[] = []
  @Input() showPlaceholder: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.imageStyle = this.width + 'px'
  }

}
