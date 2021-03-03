import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  {
    path: 'all',
    loadChildren: () =>
      import('./features/all/all.module').then((m) => m.AllModule)
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./features/detail/detail.module').then((m) => m.DetailModule),
    outlet: 'dialog'
  },
  { path: '**', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
