# Altius 2k25 Event Management System

A full-stack web application for managing technical fest events, built with Spring Boot (Java), Angular, MongoDB Atlas, and PostgreSQL (Neon).

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

## Features

- **Authentication**: Login system for event coordinators using USN and password
- **Home Page**: Dynamic responsive homepage with event carousel and coordinator information
- **Events Management**: Browse all events with poster-based cards
- **Department-wise Events**: Filter and view events by department
- **Event Details**: Detailed event pages with posters, rulebooks, and coordinator contacts
- **Admin Panel**: Submit event results (winners and runners)
- **View Scores**: View submitted results and request updates
- **Notifications**: Administrator-only notification panel for approval requests

## Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data MongoDB
- Spring Data JPA
- PostgreSQL (Neon Database)
- Maven

### Frontend
- Angular 17
- TypeScript
- RxJS
- HTML5/CSS3

### Databases
- MongoDB Atlas (Event data and credentials)
- PostgreSQL/Neon (Event results and notifications)

## Prerequisites

Before you begin, ensure you have the following installed:
- Java JDK 17 or higher
- Node.js 18.x or higher
- npm 9.x or higher
- Maven 3.8+
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sudharmas/Altius2k25.git
cd Altius2k25
```

### 2. Backend Setup

```bash
cd backend
mvn clean install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Configuration

### Quick Start (Development)

For local development, the application works out-of-the-box with minimal configuration:

```bash
cd backend
mvn spring-boot:run
```

The application will use:
- **H2 in-memory database** for event results (no setup required)
- **Local MongoDB** (optional - some features may be limited without it)

### Production Configuration

For production deployment with cloud databases:

1. **MongoDB Atlas Setup**:
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster and database named `altius2k25`
   - Create collections: `EVENTS` and `CREDENTIALS`
   - Get your connection string

2. **Neon PostgreSQL Setup** (optional - H2 works for development):
   - Create a free account at [Neon](https://neon.tech/)
   - Create a new project and database
   - Get your connection string

3. **Configure Using Environment Variables** (recommended):

```bash
export MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/altius2k25"
export POSTGRES_URL="jdbc:postgresql://<neon-host>/<database>?sslmode=require"
export POSTGRES_USERNAME="<username>"
export POSTGRES_PASSWORD="<password>"
export POSTGRES_DRIVER="org.postgresql.Driver"
export HIBERNATE_DIALECT="org.hibernate.dialect.PostgreSQLDialect"
```

**For detailed configuration instructions, see [DATABASE_CONFIGURATION.md](DATABASE_CONFIGURATION.md)**

### Frontend Configuration

Update `frontend/src/environments/environment.ts` and `environment.prod.ts`:

```typescript
export const environment = {
  production: false, // true for production
  apiUrl: 'http://localhost:8080/api' // Update for production
};
```

### Adding Initial Data

#### Add Credentials to MongoDB

Insert into the `CREDENTIALS` collection:

```json
{
  "username": "4SU20CS001",
  "password": "password123",
  "role": "ADMIN"
}
```

For administrator:
```json
{
  "username": "ADMIN001",
  "password": "admin123",
  "role": "ADMINISTRATOR"
}
```

#### Add Sample Events to MongoDB

Insert into the `EVENTS` collection:

```json
{
  "eventId": "AK25001",
  "departmentId": "CSE",
  "eventName": "TechTalk",
  "posterPath": "AK25001.jpg",
  "rulebookPath": "AK25001.pdf",
  "coordinators": {
    "4SU20CS001": "+91 9876543210",
    "4SU20CS002": "+91 9876543211"
  }
}
```

### Adding Asset Files

1. **Event Posters**: Place poster images (JPG format) in `/posters` directory with event ID as filename (e.g., `AK25001.jpg`)

2. **Rulebooks**: Place rulebook PDFs in `/rulebooks` directory with event ID as filename (e.g., `AK25001.pdf`)

3. **Department Photos**: Place department photos in `/department_photos` directory (e.g., `CSE.jpg`, `AIML.jpg`)

## Running the Application

### Development Mode

#### Backend (Terminal 1)

```bash
cd backend
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

#### Frontend (Terminal 2)

```bash
cd frontend
npm start
```

Frontend will run on `http://localhost:4200`

### Production Build

#### Backend

```bash
cd backend
mvn clean package
java -jar target/eventmanagement-1.0.0.jar
```

#### Frontend

```bash
cd frontend
npm run build
```

Build files will be in `frontend/dist/altius-frontend`

## Project Structure

```
Altius2k25/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/altius/eventmanagement/
│   │   │   │   ├── config/         # Configuration files
│   │   │   │   ├── controller/     # REST controllers
│   │   │   │   ├── model/          # Data models
│   │   │   │   ├── repository/     # Database repositories
│   │   │   │   ├── service/        # Business logic
│   │   │   │   └── dto/            # Data transfer objects
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/         # Angular components
│   │   │   ├── services/           # Angular services
│   │   │   ├── models/             # TypeScript models
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── assets/                 # Static assets
│   │   ├── environments/           # Environment configs
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── posters/                        # Event posters
├── rulebooks/                      # Event rulebooks
├── department_photos/              # Department photos
├── README.md
├── GUIDE.md
└── DEPLOYMENT.md
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login

### Events
- GET `/api/events` - Get all events
- GET `/api/events/{eventId}` - Get event by ID
- GET `/api/events/department/{departmentId}` - Get events by department

### Admin
- POST `/api/admin/submit-result` - Submit event result
- GET `/api/admin/results` - Get all results
- PUT `/api/admin/results/{id}` - Update result
- POST `/api/admin/request-update` - Request result update
- GET `/api/admin/notifications` - Get pending notifications (Administrator only)
- PUT `/api/admin/notifications/{id}` - Update notification status

## Default Credentials

For testing purposes, add these credentials to your MongoDB:

**Admin User**:
- Username: `4SU20CS001`
- Password: `password123`

**Administrator**:
- Username: `ADMIN001`
- Password: `admin123`

## Troubleshooting

### Database Connection Issues

**PostgreSQL Connection Errors** (UnknownHostException, Connection Refused):
- The application uses **H2 in-memory database by default** for development
- PostgreSQL configuration is optional - only needed for production
- See [DATABASE_CONFIGURATION.md](DATABASE_CONFIGURATION.md) for detailed setup

### MongoDB Connection Issues
- For development, MongoDB is optional (some features may be limited)
- Ensure your IP address is whitelisted in MongoDB Atlas
- Check connection string format
- Verify database name and credentials
- See [DATABASE_CONFIGURATION.md](DATABASE_CONFIGURATION.md) for detailed troubleshooting

### Frontend Not Connecting to Backend
- Verify backend is running on port 8080
- Check CORS configuration in backend
- Update `environment.ts` with correct API URL

## Support

For issues or questions, please open an issue on the GitHub repository.