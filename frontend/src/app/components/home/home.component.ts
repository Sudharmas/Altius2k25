import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredEvents: Event[] = [];

  coordinators = {
    staff: [
      { name: 'Dr. Staff Coordinator 1', contact: '+91 9876543210', photo: 'assets/coordinators/staff1.jpg' },
      { name: 'Prof. Staff Coordinator 2', contact: '+91 9876543211', photo: 'assets/coordinators/staff2.jpg' }
    ],
    students: [
      { name: 'Student Coordinator 1', contact: '+91 9876543212', photo: 'assets/coordinators/student1.jpg' },
      { name: 'Student Coordinator 2', contact: '+91 9876543213', photo: 'assets/coordinators/student2.jpg' }
    ]
  };

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadFeaturedEvents();
  }

  loadFeaturedEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.featuredEvents = events.slice(0, 6);
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }
}
