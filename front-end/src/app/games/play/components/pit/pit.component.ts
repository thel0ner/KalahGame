import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pit',
  templateUrl: './pit.component.html',
  styleUrls: ['./pit.component.scss']
})
export class PitComponent implements OnInit,OnChanges {
  @Input() totalSeeds = 0;
  toIterate:number[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.toIterate = new Array(this.totalSeeds).fill(1);
  }

  ngOnInit(): void {
  }

}
