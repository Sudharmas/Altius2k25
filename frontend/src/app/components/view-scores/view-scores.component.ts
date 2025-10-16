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

  loadResults() {
    this.adminService.getAllResults().subscribe({
      next: (results) => {
        this.results = results;
      },
      error: (error) => {
        console.error('Error loading results:', error);
      }
    });
  }

  requestUpdate(result: EventResult) {
    const message = `Request to update event ${result.eventId}: Winners - ${result.winnersDept}, Runners - ${result.runnersDept}`;
    
    this.adminService.requestUpdate({
      coordinatorId: result.coordinatorId,
      eventId: result.eventId,
      message: message
    }).subscribe({
      next: () => {
        this.requestMessage = 'Update request sent to administrator!';
        setTimeout(() => this.requestMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error sending request:', error);
      }
    });
  }
}
