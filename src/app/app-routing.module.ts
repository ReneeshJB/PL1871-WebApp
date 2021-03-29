import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CoordinatorDashboardComponent } from './coordinator-dashboard/coordinator-dashboard.component';
import { CourseEnquiryReportComponent } from './course-enquiry-report/course-enquiry-report.component';
import { CourseListComponent } from './course-list/course-list.component';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { LoginComponent } from './login/login.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AuthGuard } from './shared/auth.guard';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: '1' } },
  { path: 'admin/user-list', component: UserListComponent, canActivate: [AuthGuard], data: { role: '1' } },
  { path: 'admin/course-list', component: CourseListComponent, canActivate: [AuthGuard], data: { role: '1' } },
  { path: 'coordinator', component: CoordinatorDashboardComponent,canActivate: [AuthGuard], data: { role: '2' } },
  { path: 'coordinator/enquiry-list', component: EnquiryListComponent,canActivate: [AuthGuard], data: { role: '2' } },
  { path: 'manager', component: ManagerDashboardComponent,canActivate: [AuthGuard], data: { role: '3' } },
  { path: 'manager/course-enquiry-report', component: CourseEnquiryReportComponent,canActivate: [AuthGuard], data: { role: '3' } },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
