import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminShellComponent } from 'src/app/admin-shell/admin-shell.component';

const routes: Routes = [{ path: '', component: AdminShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminShellRoutingModule { }
