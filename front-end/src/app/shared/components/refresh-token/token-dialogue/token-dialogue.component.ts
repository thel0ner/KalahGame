import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-token-dialogue',
  templateUrl: './token-dialogue.component.html',
  styleUrls: ['./token-dialogue.component.scss']
})
export class TokenDialogueComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  progressBarValue = 30000;
  shouldLogOut = false;
  shouldAskForRefreshToken = false;
  constructor(
    public activeModal: NgbActiveModal,
    public config: NgbProgressbarConfig
  ) {
    config.max = 30000;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }

  private subscribers() {
    const progressBar$ = interval(100).pipe(
      takeWhile(_ => this.progressBarValue >= 0),
    ).subscribe(
      next => {
        this.progressBarValue = this.progressBarValue - next
      },
      error => { },
      () => {
        this.shouldLogOut = true;
        this.activeModal.close();
      }
    );
    this.subs.push(progressBar$);
  }

  close(){
    this.shouldLogOut = false;
    this.shouldAskForRefreshToken = true;
    this.activeModal.close();
  }

  ngOnInit(): void {
    this.subscribers();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
