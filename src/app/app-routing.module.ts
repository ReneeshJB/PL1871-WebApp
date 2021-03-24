import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CourseListComponent } from './course-list/course-list.component';
import { LoginComponent } from './login/login.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'admin/course-list', component: CourseListComponent},
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard],data:{role: '2'}},
  {path: 'manager', component: ManagerDashboardComponent, canActivate: [AuthGuard],data:{role: '1'}},
  {path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
