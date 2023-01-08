import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AreebaHookComponent } from '../../components/pgHook/areeba-hook/areeba-hook.component';

const pgHookRoutes = [
  {
    path: 'pgacb/:id',
    component: AreebaHookComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(pgHookRoutes)
  ],
  declarations: [],
  providers: [],
  entryComponents: [],
  exports: [RouterModule]
})
export class PgHookModule { }
