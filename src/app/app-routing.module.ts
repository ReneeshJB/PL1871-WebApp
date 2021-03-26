import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CourseListComponent } from './course-list/course-list.component';
import { LoginComponent } from './login/login.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AuthGuard } from './shared/auth.guard';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent },
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard],data:{role: '1'}},
  {path: 'admin/user-list', component: UserListComponent, canActivate: [AuthGuard],data:{role: '1'}},
  {path: 'admin/course-list', component: CourseListComponent,canActivate: [AuthGuard],data:{role: '1'}},
  {path: 'manager', component: ManagerDashboardComponent, canActivate: [AuthGuard],data:{role: '3'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
