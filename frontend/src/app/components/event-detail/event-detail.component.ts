import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/models';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  coordinatorsList: Array<{ id: string, contact: string }> = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    if (eventId) {
      this.loadEventDetails(eventId);
    }
  }

  loadEventDetails(eventId: string) {
    this.eventService.getEventById(eventId).subscribe({
      next: (event) => {
        this.event = event;
        this.coordinatorsList = Object.entries(event.coordinators).map(([id, contact]) => ({
          id,
          contact
        }));
      },
      error: (error) => {
        console.error('Error loading event details:', error);
      }
    });
  }

  downloadRulebook() {
    if (this.event?.rulebookPath) {
      const link = document.createElement('a');
      link.href = `assets/rulebooks/${this.event.eventId}.pdf`;
      link.download = `${this.event.eventName}_Rulebook.pdf`;
      link.click();
    }
  }
}
