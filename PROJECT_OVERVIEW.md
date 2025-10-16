# Altius 2k25 - Project Overview

## What is Altius 2k25?

Altius 2k25 is a comprehensive full-stack web application designed to manage technical fest events. It provides a complete solution for event coordinators to manage events, submit results, and handle participant queries.

## Key Features

### 1. Public Features (No Login Required)
- **Home Page**: Dynamic landing page with fest information
- **Events Browsing**: View all events with attractive poster displays
- **Event Details**: Detailed information about each event
  - Event poster
  - Downloadable rulebook
  - Coordinator contact information
- **Department Browsing**: Filter events by department
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 2. Coordinator Features (Login Required)
- **Secure Login**: USN-based authentication
- **Admin Panel**: Submit event results
  - Select event from dropdown
  - Enter winners department
  - Enter runners department
  - Mark event as concluded
- **View Scores**: See all submitted results
- **Request Updates**: Submit requests to modify results
- **Profile Management**: Access coordinator-specific features

### 3. Administrator Features (Special Access)
- **All Coordinator Features**: Plus additional capabilities
- **Notification Panel**: 
  - View update requests from coordinators
  - Approve or reject modification requests
  - Track request status
- **System Management**: Oversee all activities

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Build Tool**: Maven
- **Primary Database**: MongoDB Atlas (NoSQL)
  - Stores event information
  - Stores user credentials
- **Secondary Database**: Neon PostgreSQL (SQL)
  - Stores event results
  - Stores notifications
- **APIs**: RESTful APIs with JSON

### Frontend
- **Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: Custom CSS3 with responsive design
- **HTTP Client**: Angular HttpClient with RxJS
- **Routing**: Angular Router
- **State Management**: Services with observables

### Architecture
- **Pattern**: MVC (Model-View-Controller)
- **API**: RESTful design
- **Authentication**: Simple credential-based (educational purpose)
- **CORS**: Configured for cross-origin requests

## Database Schema

### MongoDB Collections

#### EVENTS Collection
```javascript
{
  _id: ObjectId,
  eventId: "AK25001",              // Unique event identifier
  departmentId: "CSE",             // Department code
  eventName: "Code Sprint",        // Event name
  posterPath: "AK25001.jpg",       // Poster filename
  rulebookPath: "AK25001.pdf",     // Rulebook filename
  coordinators: {                  // Map of coordinator USN to contact
    "4SU20CS001": "+91 9876543210",
    "4SU20CS002": "+91 9876543211"
  }
}
```

#### CREDENTIALS Collection
```javascript
{
  _id: ObjectId,
  username: "4SU20CS001",          // USN
  password: "password123",         // Plain text (for simplicity)
  role: "ADMIN"                    // ADMIN or ADMINISTRATOR
}
```

### PostgreSQL Tables

#### event_results Table
```sql
id              BIGSERIAL PRIMARY KEY
coordinator_id  VARCHAR(255)
event_id        VARCHAR(255)
winners_dept    VARCHAR(255)
runners_dept    VARCHAR(255)
submitted_at    TIMESTAMP
```

#### notifications Table
```sql
id              BIGSERIAL PRIMARY KEY
coordinator_id  VARCHAR(255)
event_id        VARCHAR(255)
message         TEXT
status          VARCHAR(50)      -- PENDING, APPROVED, REJECTED
created_at      TIMESTAMP
```

## API Endpoints

### Authentication APIs
- `POST /api/auth/login` - User login

### Event APIs
- `GET /api/events` - Get all events
- `GET /api/events/{eventId}` - Get event by ID
- `GET /api/events/department/{departmentId}` - Get events by department

### Admin APIs
- `POST /api/admin/submit-result` - Submit event result
- `GET /api/admin/results` - Get all results
- `PUT /api/admin/results/{id}` - Update result
- `POST /api/admin/request-update` - Request result modification
- `GET /api/admin/notifications` - Get pending notifications (Admin only)
- `PUT /api/admin/notifications/{id}` - Update notification status

## Application Flow

### User Journey: Participant (No Login)

1. Open application → Home page
2. Browse events → Click on event poster
3. View event details:
   - See full poster
   - Read coordinator contacts
   - Download rulebook
4. Browse by department → See department-specific events
5. Contact coordinators for queries

### User Journey: Event Coordinator

1. Login with USN and password
2. Browse events and departments (public features)
3. After event completion:
   - Go to Admin Panel
   - Select event from dropdown
   - Enter results (winners, runners)
   - Submit
4. Review submitted results:
   - Go to View Scores
   - See all submitted results
   - If error: Click "Request Update"
5. Logout

### User Journey: Administrator

1. Login with administrator credentials
2. All coordinator features available
3. Additionally:
   - Check Notifications panel
   - Review update requests
   - Approve or reject requests
   - Manage system

## File Organization

### Backend Structure
```
backend/
├── src/main/java/com/altius/eventmanagement/
│   ├── EventManagementApplication.java    # Main Spring Boot class
│   ├── config/
│   │   └── CorsConfig.java                # CORS configuration
│   ├── controller/                        # REST controllers
│   │   ├── AuthController.java            # Login API
│   │   ├── EventController.java           # Event APIs
│   │   └── AdminController.java           # Admin APIs
│   ├── model/                             # Data models
│   │   ├── Event.java                     # MongoDB event model
│   │   ├── Credential.java                # MongoDB credential model
│   │   ├── EventResult.java               # PostgreSQL result model
│   │   └── Notification.java              # PostgreSQL notification model
│   ├── repository/                        # Database repositories
│   │   ├── EventRepository.java
│   │   ├── CredentialRepository.java
│   │   ├── EventResultRepository.java
│   │   └── NotificationRepository.java
│   ├── service/                           # Business logic
│   │   ├── AuthService.java
│   │   ├── EventService.java
│   │   └── AdminService.java
│   └── dto/                               # Data transfer objects
│       ├── LoginRequest.java
│       ├── LoginResponse.java
│       ├── EventDetailResponse.java
│       └── ResultSubmissionRequest.java
└── src/main/resources/
    └── application.properties             # Configuration
```

### Frontend Structure
```
frontend/src/app/
├── components/                            # UI components
│   ├── navbar/                           # Navigation bar
│   ├── footer/                           # Footer
│   ├── login/                            # Login page
│   ├── home/                             # Home page
│   ├── events/                           # All events page
│   ├── event-detail/                     # Individual event page
│   ├── departments/                      # Departments page
│   ├── department-events/                # Department-specific events
│   ├── admin-panel/                      # Result submission
│   ├── view-scores/                      # Results viewing
│   └── notifications/                    # Administrator notifications
├── services/                              # Angular services
│   ├── auth.service.ts                   # Authentication
│   ├── event.service.ts                  # Event operations
│   └── admin.service.ts                  # Admin operations
├── models/
│   └── models.ts                         # TypeScript interfaces
├── environments/
│   ├── environment.ts                    # Development config
│   └── environment.prod.ts               # Production config
├── app.module.ts                          # Main module
└── app-routing.module.ts                  # Routing configuration
```

## Security Considerations

**Note**: This application uses simplified authentication for educational purposes.

### Current Implementation
- Plain text password storage
- Simple credential matching
- No encryption

### For Production Use
Consider implementing:
- Password hashing (bcrypt)
- JWT tokens
- OAuth 2.0
- Rate limiting
- HTTPS only
- Input validation
- SQL injection prevention
- XSS protection

## Deployment Options

### Free Tier Options for Students

1. **Frontend**:
   - Vercel (Recommended)
   - Netlify
   - GitHub Pages
   - Firebase Hosting

2. **Backend**:
   - Render (Recommended)
   - Railway
   - Heroku (Eco dynos)

3. **Databases**:
   - MongoDB Atlas (Free M0 tier - 512MB)
   - Neon PostgreSQL (Free tier - 0.5GB)

4. **Full Stack**:
   - Azure App Service (Student free tier)
   - Google Cloud Platform (Free tier)
   - AWS (Free tier for 1 year)

See `DEPLOYMENT.md` for detailed deployment instructions.

## Customization

### Adding New Events
1. Add event data to MongoDB `EVENTS` collection
2. Place poster in `/posters` directory
3. Place rulebook in `/rulebooks` directory
4. Event automatically appears in UI

### Adding New Departments
1. Update departments list in `departments.component.ts`
2. Add department photo to `/department_photos`
3. Add events with matching `departmentId`

### Changing Styling
- Global styles: `frontend/src/styles.css`
- Component styles: Each component's `.css` file
- Colors, fonts, layouts can be customized

### Adding Features
- Backend: Add controllers, services, models
- Frontend: Add components, services
- Update routing as needed

## Performance Optimization

### Backend
- Database indexing on frequently queried fields
- Connection pooling
- Caching frequently accessed data
- Lazy loading of large datasets

### Frontend
- Lazy loading of routes
- Image optimization
- Bundle size optimization
- CDN for static assets

## Testing Strategy

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing Checklist
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Browse all events
- [ ] View event details
- [ ] Download rulebook
- [ ] Browse departments
- [ ] View department events
- [ ] Submit result (coordinator)
- [ ] View submitted results
- [ ] Request update
- [ ] View notifications (administrator)
- [ ] Approve/reject requests (administrator)
- [ ] Logout

## Maintenance

### Regular Tasks
1. Monitor database usage
2. Check application logs
3. Update dependencies periodically
4. Backup databases
5. Review and approve update requests

### Troubleshooting
See `README.md` and `QUICK_START.md` for common issues and solutions.

## Support and Documentation

- **Setup**: `README.md`
- **Quick Start**: `QUICK_START.md`
- **User Guide**: `GUIDE.md`
- **Deployment**: `DEPLOYMENT.md`
- **Sample Data**: `SAMPLE_DATA.md`

## Future Enhancements

Possible improvements:
- Real-time notifications with WebSockets
- Email notifications
- File upload for posters/rulebooks through UI
- Advanced search and filtering
- Event registration system
- Live scoreboard
- Analytics dashboard
- Mobile app (React Native/Flutter)
- Social media integration
- QR code generation for events

## License

This project is created for educational purposes as part of Altius 2k25 technical fest.

## Credits

Built with ❤️ for Altius 2k25

---

**Project Status**: Complete and Ready for Use  
**Version**: 1.0.0  
**Last Updated**: January 2025
