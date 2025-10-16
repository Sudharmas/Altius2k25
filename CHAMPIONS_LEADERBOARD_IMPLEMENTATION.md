# Champions Leaderboard Implementation

## Overview
This document describes the implementation of the Champions Counter and Dynamic Leaderboard feature for the Altius 2k25 Event Management System.

## Problem Statement
When coordinators submit event results (winners and runners), the system should:
1. Store department IDs (not names) in the database
2. Automatically update a champions count for each department
3. Display a dynamic leaderboard on the home page showing top 5 departments
4. Auto-refresh the leaderboard every 5 minutes

## Implementation Details

### Backend Components

#### 1. Constants Classes
**Location**: `backend/src/main/java/com/altius/eventmanagement/constants/`

- **DepartmentConstants.java**: Contains a static map of department IDs to department names
  - DEPT001 → Computer Science and Engineering
  - DEPT002 → Electronics and Communication Engineering
  - DEPT003 → Mechanical Engineering
  - etc.

- **EventConstants.java**: Contains a static map of event IDs to event names
  - EVNT001 → Tic-Tac-Toe
  - EVNT012 → Chess
  - EVNT004 → BDRF
  - EVNT006 → Carrom

#### 2. Database Entity
**Location**: `backend/src/main/java/com/altius/eventmanagement/model/ChampionsCount.java`

- JPA Entity for Neon PostgreSQL database
- Table: `champions_count`
- Fields:
  - `id` (Long): Auto-generated primary key
  - `deptId` (String): Unique department ID (e.g., "DEPT001")
  - `count` (Integer): Number of prizes won (default: 0)

#### 3. Repository
**Location**: `backend/src/main/java/com/altius/eventmanagement/repository/ChampionsCountRepository.java`

- JPA Repository interface
- Custom method: `findByDeptId(String deptId)` to find department count by ID

#### 4. Service Layer
**Location**: `backend/src/main/java/com/altius/eventmanagement/service/ChampionsService.java`

Key Methods:
- **championsCounter(winnerDeptId, runnerDeptId)**: 
  - Called automatically when results are submitted
  - Increments count by 1 for both winner and runner departments
  - Creates new record if department doesn't exist
  - Uses @Transactional to ensure data consistency

- **getLeaderboard()**: 
  - Fetches all department counts
  - Sorts by count in descending order
  - Returns top 5 departments
  - Includes dept ID, dept name, and count

- **getDepartments()**: Returns all departments map
- **getEvents()**: Returns all events map

**Location**: `backend/src/main/java/com/altius/eventmanagement/service/AdminService.java`

Updated `submitResult()` method:
- Saves event result to MongoDB
- Immediately calls `championsService.championsCounter()`
- Ensures leaderboard is updated without delay

#### 5. Controller Layer
**Location**: `backend/src/main/java/com/altius/eventmanagement/controller/ChampionsController.java`

REST Endpoints:
- `GET /api/champions/leaderboard` - Get top 5 departments
- `GET /api/champions/departments` - Get all departments map
- `GET /api/champions/events` - Get all events map

### Frontend Components

#### 1. Models
**Location**: `frontend/src/app/models/models.ts`

Added interface:
```typescript
export interface ChampionsCount {
  deptId: string;
  deptName: string;
  count: number;
}
```

#### 2. Services
**Location**: `frontend/src/app/services/admin.service.ts`

Added methods:
- `getLeaderboard()`: Observable<ChampionsCount[]>
- `getDepartments()`: Observable<{ [key: string]: string }>
- `getEventsList()`: Observable<{ [key: string]: string }>

#### 3. Admin Panel Component
**Location**: `frontend/src/app/components/admin-panel/`

Updates:
- Changed department and event input fields to dropdowns
- Loads departments and events from backend on init
- Submits only department IDs (e.g., "DEPT001") instead of names
- Shows success message indicating leaderboard will be updated

**HTML Changes**:
- Event dropdown shows: "Event Name - EVENT_ID"
- Department dropdowns show: "Department Name - DEPT_ID"
- All dropdowns include "Select..." placeholder

#### 4. Home Component
**Location**: `frontend/src/app/components/home/`

**TypeScript Updates**:
- Implements `OnDestroy` lifecycle hook
- Adds `leaderboard` array to store ChampionsCount data
- Loads leaderboard on component init
- Sets up auto-refresh using RxJS `interval(300000)` (5 minutes)
- Cleans up subscription on component destroy

**HTML Updates**:
- Added leaderboard section between events and coordinators sections
- Displays top 5 departments with:
  - Rank number (1-5)
  - Medal emoji for top 3 (🥇🥈🥉)
  - Department name and ID
  - Score (number of wins)
- Shows "No results yet" message if leaderboard is empty
- Displays "Updates automatically every 5 minutes" message

**CSS Updates**:
- Added `leaderboard-section` with gradient background
- Styled leaderboard items with:
  - Different styles for 1st, 2nd, 3rd place
  - Gold gradient for 1st place
  - Silver gradient for 2nd place
  - Bronze gradient for 3rd place
  - Hover effects and animations
  - Bouncing medal animation
  - Slide-in animation for items
- Responsive design for mobile devices

## Database Configuration

### MongoDB (Atlas)
Used for storing:
- Events (EVENTS collection)
- Event Results (EVENT_RESULTS collection)
- Credentials

### Neon PostgreSQL
Used for storing:
- Notifications
- **Champions Count (champions_count table)** ← NEW

Configuration in `application.properties`:
- JPA will auto-create the `champions_count` table on first run
- Hibernate DDL auto: update mode

## API Endpoints

### New Endpoints

1. **Get Leaderboard**
   - URL: `GET /api/champions/leaderboard`
   - Response: Array of top 5 departments with counts
   ```json
   [
     {
       "deptId": "DEPT001",
       "deptName": "Computer Science and Engineering",
       "count": 15
     }
   ]
   ```

2. **Get Departments**
   - URL: `GET /api/champions/departments`
   - Response: Map of department IDs to names
   ```json
   {
     "DEPT001": "Computer Science and Engineering",
     "DEPT002": "Electronics and Communication Engineering"
   }
   ```

3. **Get Events**
   - URL: `GET /api/champions/events`
   - Response: Map of event IDs to names
   ```json
   {
     "EVNT001": "Tic-Tac-Toe",
     "EVNT012": "Chess"
   }
   ```

### Modified Endpoints

1. **Submit Result**
   - URL: `POST /api/admin/submit-result`
   - Now expects department IDs instead of names
   - Automatically calls champions counter function
   ```json
   {
     "coordinatorId": "COORD001",
     "eventId": "EVNT001",
     "winnersDept": "DEPT001",
     "runnersDept": "DEPT002"
   }
   ```

## User Flow

### For Coordinators (Result Submission)
1. Login to admin panel
2. Select event from dropdown (shows: "Event Name - EVENT_ID")
3. Select winner department from dropdown
4. Select runner department from dropdown
5. Submit result
6. System:
   - Saves result to MongoDB
   - Increments count for both departments in Neon DB
   - Returns success message

### For Users (Viewing Leaderboard)
1. Visit home page
2. Scroll to "Champions Leaderboard" section
3. View top 5 departments with their scores
4. Leaderboard automatically refreshes every 5 minutes
5. Manual refresh also updates leaderboard

## Key Features

1. **Automatic Count Update**: When a result is submitted, both winner and runner departments get +1 to their count
2. **Real-time Leaderboard**: Uses separate database collection for fast queries
3. **Auto-refresh**: Frontend automatically refreshes every 5 minutes without page reload
4. **Top 5 Display**: Shows only the top 5 performing departments
5. **Visual Hierarchy**: Top 3 departments have special styling (gold, silver, bronze)
6. **Animated UI**: Smooth animations and hover effects
7. **Responsive Design**: Works on desktop, tablet, and mobile devices
8. **Centralized Constants**: Easy to add/modify departments and events

## Benefits

1. **Performance**: Separate table for counts means fast leaderboard queries
2. **Consistency**: Transaction management ensures accurate counts
3. **Maintainability**: Constants in one place, easy to update
4. **User Experience**: Real-time updates without manual refresh
5. **Scalability**: Can easily add more departments or events
6. **Data Integrity**: Uses unique constraint on deptId to prevent duplicates

## Future Enhancements

1. Add filtering by time period (weekly, monthly, all-time)
2. Show detailed breakdown of wins per event
3. Add export functionality for leaderboard data
4. Implement websockets for instant updates
5. Add historical leaderboard data tracking
6. Create admin dashboard for leaderboard management
