import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BarMenuComponent } from './bar-menu/bar-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/auth.service';



@NgModule({
  declarations: [
    SideMenuComponent,
    BarMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
  ],
  exports: [
    SideMenuComponent,
    BarMenuComponent,
  ],
  providers:[]
})
export class StructureModule { }
