import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {
  @Input() pitsData: number[] = [];
  @Output() selectedPit: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  notify(id: number) {
    if (this.pitsData[id] === 0) return;
    this.selectedPit.emit(id);
  }

}
