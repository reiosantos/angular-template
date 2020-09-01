import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@san/shared/components/layout/layout.component';
import { AuthGuard } from '@san/core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Traffic' },
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
