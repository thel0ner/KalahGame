import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list.component';


@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    NgxDatatableModule,
    SharedModule,
  ]
})
export class ListModule { }
