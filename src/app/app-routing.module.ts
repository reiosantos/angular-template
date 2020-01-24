import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  PageNotFoundComponent
} from '@san/shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from '@san/core/guards/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: '404 - Not Found' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
