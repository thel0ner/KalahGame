import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit,OnChanges {
  @Input() totalSeeds = 0;
  toIterate:number[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.toIterate = new Array(this.totalSeeds).fill(1);    
  }

  ngOnInit(): void {
  }

}
