import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayComponent } from './play.component';
import { PlayResolver } from './play.resolver';
import { BoardComponent } from './components/board/board.component';
import { StoreComponent } from './components/store/store.component';
import { PitComponent } from './components/pit/pit.component';
import { SeedComponent } from './components/seed/seed.component';
import { ArenaComponent } from './components/arena/arena.component';
import { SeedsDistributerService } from './services/seeds-distributer.service';
import { MoveRecorderService } from './services/record-move.service';
import { GameStatusPipe } from './pipes/game-status.pipe';


@NgModule({
  declarations: [
    PlayComponent,
    BoardComponent,
    StoreComponent,
    PitComponent,
    SeedComponent,
    ArenaComponent,
    GameStatusPipe
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
  ],
  providers: [
    PlayResolver,
    SeedsDistributerService,
    MoveRecorderService,
  ]
})
export class PlayModule { }
