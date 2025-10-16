import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DepartmentEventsComponent } from './components/department-events/department-events.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ViewScoresComponent } from './components/view-scores/view-scores.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:eventId', component: EventDetailComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'departments/:departmentId', component: DepartmentEventsComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'view-scores', component: ViewScoresComponent },
  { path: 'notifications', component: NotificationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
