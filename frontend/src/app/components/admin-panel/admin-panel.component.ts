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
  // Maps for departments and events - will be loaded from API
  events: { [key: string]: string } = {}; // Maps event IDs to event names
  departments: { [key: string]: string } = {}; // Maps department IDs to department names

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
    this.loadDepartments();
  }

  loadEvents() {
    this.adminService.getEventsList().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.errorMessage = 'Failed to load events.';
      }
    });
  }

  loadDepartments() {
    this.adminService.getDepartments().subscribe({
      next: (depts) => {
        this.departments = depts;
      },
      error: (error) => {
        console.error('Error loading departments:', error);
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
        this.successMessage = 'Result submitted successfully! Leaderboard will be updated.';
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage = 'Failed to submit result. Please try again.';
        console.error('Error submitting result:', error);
      }
    });
  }

  getDepartmentKeys(): string[] {
    return Object.keys(this.departments);
  }

  getEventKeys(): string[] {
    return Object.keys(this.events);
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
