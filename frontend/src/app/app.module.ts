import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DepartmentEventsComponent } from './components/department-events/department-events.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ViewScoresComponent } from './components/view-scores/view-scores.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EventsComponent,
    EventDetailComponent,
    DepartmentsComponent,
    DepartmentEventsComponent,
    AdminPanelComponent,
    ViewScoresComponent,
    NotificationsComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
