// /workspaces/Altius2k25/frontend/src/app/components/admin-panel/admin-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { EventResult } from '../../models/models';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  result: EventResult = {
    id: 0, // Changed from resultId to id
    eventId: '',
    winnersDept: '',
    runnersDept: '',
    coordinatorId: ''
  };
  events: any[] = [];
  departments: { [key: string]: string } = {}; // Added departments property
  formData: any = {}; // Added formData property
  successMessage: string = ''; // Added successMessage property
  errorMessage: string = ''; // Added errorMessage property
  requestMessage = '';

  constructor(
    private adminService: AdminService,
    private authService: AuthService, // Injected AuthService
    private router: Router // Injected Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadEvents();
    this.loadDepartments();
    this.resetForm();
  }

  loadEvents(): void {
    this.adminService.getEvents().subscribe({
      next: (events: any[]) => {
        this.events = events;
      },
      error: (error: any) => {
        console.error('Error loading events:', error);
      }
    });
  }

  loadDepartments(): void {
    this.adminService.getDepartments().subscribe({
      next: (depts: { [key: string]: string }) => {
        this.departments = depts;
      },
      error: (error: any) => {
        console.error('Error loading departments:', error);
      }
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.formData.eventId || !this.formData.winnersDept || !this.formData.runnersDept) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.adminService.submitResult(this.formData).subscribe({
      next: () => {
        this.successMessage = 'Result submitted successfully! Leaderboard will be updated.';
        this.resetForm();
      },
      error: (error: any) => {
        console.error('Error submitting result:', error);
        this.errorMessage = 'Failed to submit result. Please try again.';
      }
    });
  }

  getDepartmentKeys(): string[] {
    return Object.keys(this.departments);
  }

  resetForm(): void {
    const user = this.authService.getUser();
    this.formData = {
      eventId: '',
      winnersDept: '',
      runnersDept: '',
      coordinatorId: user ? user.username : ''
    };
  }
}
