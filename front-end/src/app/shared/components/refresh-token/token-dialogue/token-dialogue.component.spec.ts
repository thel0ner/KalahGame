import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenDialogueComponent } from './token-dialogue.component';

describe('TokenDialogueComponent', () => {
  let component: TokenDialogueComponent;
  let fixture: ComponentFixture<TokenDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
