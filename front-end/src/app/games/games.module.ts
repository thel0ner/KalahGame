import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GamesGuard } from './games.guard';
import { ListService } from './shared/services/list.service';
import { DeletionService } from './shared/services/deletion.service';
import { NewGameService } from './shared/services/new-game.service';
import { SharedModule } from '../shared/shared.module';
import { RefreshStateService } from './shared/services/refresh-state.service';


@NgModule({
  declarations: [
    GamesComponent,
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    SharedModule,
  ],
  providers:[
    GamesGuard,
    ListService,
    DeletionService,
    NewGameService,
    RefreshStateService,
  ]
})
export class GamesModule { }
