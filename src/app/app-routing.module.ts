import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsblogComponent } from './newsblog/newsblog.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'blog/:blogId', component: NewsblogComponent },
  { path: '**', redirectTo: '' }, // Redirect to the default route for any unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
