import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialogue',
  templateUrl: './confirm-dialogue.component.html',
  styleUrls: ['./confirm-dialogue.component.scss']
})
export class ConfirmDialogueComponent implements OnInit {
  @Input() title = 'confirm dialogue';
  @Input() message = 'Are you sure?';
  @Input() cancelButtonLabel = 'Cancel';
  @Input() deleteButtonLabel = 'Delete';
  public confirmed = false;
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.confirmed = true;
    this.activeModal.close('Close clicked');
  }

}
