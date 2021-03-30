import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RequestListComponent } from './request-list/request-list.component';
import { AuthGuard } from './shared/auth.guard';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: "Admin" } },
  { path: 'admin/user-list', component: UserListComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'coordinator', component: HrDashboardComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
  { path: 'coordinator/request-list', component: RequestListComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
