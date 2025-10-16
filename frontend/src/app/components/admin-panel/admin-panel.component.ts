// /workspaces/Altius2k25/frontend/src/app/components/admin-panel/admin-panel.component.ts
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

  // list of departments to show in dropdowns
  departments: string[] = [
    'CSE', 'ECE', 'ME', 'CE', 'EE', 'AE', 'IT', 'BIO', 'CHE', 'MBA'
  ];

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
    if (user) {
      this.formData.coordinatorId = user.username;
    }
    
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.errorMessage = 'Failed to load events.';
      }
    });
  }

  submitResult() {
    this.successMessage = '';
    this.errorMessage = '';
    
    if (!this.formData.eventId || !this.formData.winnersDept || !this.formData.runnersDept) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

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
      coordinatorId: user ? user.username : '',
      eventId: '',
      winnersDept: '',
      runnersDept: ''
    };
  }
}
