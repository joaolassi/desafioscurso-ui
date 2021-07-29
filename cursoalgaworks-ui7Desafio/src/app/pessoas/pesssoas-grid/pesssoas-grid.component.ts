import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesssoas-grid',
  templateUrl: './pesssoas-grid.component.html',
  styleUrls: ['./pesssoas-grid.component.css']
})
export class PesssoasGridComponent implements OnInit {

  @Input() pessoas:any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
