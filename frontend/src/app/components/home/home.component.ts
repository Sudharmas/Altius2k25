import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../../services/event.service';
import { AdminService } from '../../services/admin.service';
import { Event, ChampionsCount } from '../../models/models';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredEvents: Event[] = [];
  leaderboard: ChampionsCount[] = [];
  private refreshSubscription?: Subscription;

  isLoading = false;

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

  constructor(
    private eventService: EventService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.loadFeaturedEvents();
    this.loadLeaderboard();
    
    // Refresh leaderboard every 5 minutes (300000 ms)
    this.refreshSubscription = interval(300000).subscribe(() => {
      this.loadLeaderboard();
    });
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
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

  loadLeaderboard(): void {
    this.isLoading = true;
    this.adminService.getLeaderboard().subscribe({
      next: (leaderboard: any[]) => { // Add type 'any[]'
        this.leaderboard = leaderboard;
        this.isLoading = false;
      },
      error: (error: any) => { // Add type 'any'
        console.error('Error loading leaderboard:', error);
        this.isLoading = false;
      }
    });
  }
}
