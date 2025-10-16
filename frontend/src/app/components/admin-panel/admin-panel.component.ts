import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Event, EventResult } from '../../models/models';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  events: Event[] = [];
  formData: EventResult = {
    coordinatorId: '',
    eventId: '',
    winnersDept: '',
    runnersDept: ''
  };
  successMessage = '';
  errorMessage = '';

  constructor(
    private adminService: AdminService,
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    const user = this.authService.getUser();
    this.formData.coordinatorId = user.username;
    
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }

  submitResult() {
    this.successMessage = '';
    this.errorMessage = '';
    
    this.adminService.submitResult(this.formData).subscribe({
      next: (result) => {
        this.successMessage = 'Result submitted successfully!';
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage = 'Failed to submit result. Please try again.';
        console.error('Error submitting result:', error);
      }
    });
  }

  resetForm() {
    const user = this.authService.getUser();
    this.formData = {
      coordinatorId: user.username,
      eventId: '',
      winnersDept: '',
      runnersDept: ''
    };
  }
}
