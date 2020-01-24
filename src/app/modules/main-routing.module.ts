import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '@san/modules/main/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Traffic' },
    component: SidebarComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
