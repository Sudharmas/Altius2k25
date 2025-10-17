import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { EventResult } from '../../models/models';

@Component({
  selector: 'app-view-scores',
  templateUrl: './view-scores.component.html',
  styleUrls: ['./view-scores.component.css']
})
export class ViewScoresComponent implements OnInit {
  results: EventResult[] = [];
  requestMessage = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadResults();
  }

  loadResults(): void {
    this.adminService.getAllResults().subscribe({
      next: (results: any[]) => { // Add type 'any[]'
        this.results = results;
      },
      error: (error: any) => { // Add type 'any'
        console.error('Error loading results:', error);
      }
    });
  }

  requestScoreUpdate(resultId: number): void {
    const message = `Request to update score for result ID: ${resultId}`;
    this.adminService.requestUpdate({ message, resultId }).subscribe({
      next: () => {
        alert('Update request sent to administrator!');
      },
      error: (error: any) => { // Add type 'any'
        console.error('Error sending update request:', error);
        alert('Failed to send update request.');
      }
    });
  }
}
