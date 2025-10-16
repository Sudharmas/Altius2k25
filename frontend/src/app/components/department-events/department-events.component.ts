import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/models';

@Component({
  selector: 'app-department-events',
  templateUrl: './department-events.component.html',
  styleUrls: ['./department-events.component.css']
})
export class DepartmentEventsComponent implements OnInit {
  departmentId: string = '';
  events: Event[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    const deptId = this.route.snapshot.paramMap.get('departmentId');
    if (deptId) {
      this.departmentId = deptId;
      this.loadDepartmentEvents(deptId);
    }
  }

  loadDepartmentEvents(departmentId: string) {
    this.eventService.getEventsByDepartment(departmentId).subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Error loading department events:', error);
      }
    });
  }
}
