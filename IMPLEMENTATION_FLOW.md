# Champions Leaderboard - Implementation Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Angular)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────┐         ┌──────────────────┐                  │
│  │  Admin Panel   │         │   Home Page      │                  │
│  │  Component     │         │   Component      │                  │
│  └────────┬───────┘         └────────┬─────────┘                  │
│           │                          │                             │
│           │                          │                             │
│           ▼                          ▼                             │
│  ┌────────────────────────────────────────────┐                   │
│  │         AdminService / EventService        │                   │
│  └────────────────────┬───────────────────────┘                   │
│                       │                                            │
└───────────────────────┼────────────────────────────────────────────┘
                        │
                        │ HTTP Requests
                        │
┌───────────────────────┼────────────────────────────────────────────┐
│                       ▼                                            │
│                  API Gateway                                       │
│              (Spring Boot REST)                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐      ┌──────────────────┐                    │
│  │ AdminController │      │ChampionsController│                   │
│  └────────┬────────┘      └────────┬──────────┘                   │
│           │                        │                               │
│           ▼                        ▼                               │
│  ┌─────────────────┐      ┌──────────────────┐                    │
│  │  AdminService   │      │ ChampionsService │                    │
│  └────────┬────────┘      └────────┬──────────┘                   │
│           │                        │                               │
│           │      calls immediately │                               │
│           └───────────►────────────┘                               │
│                       championsCounter()                           │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                        DATABASES                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────┐  ┌──────────────────────┐   │
│  │   MongoDB (Events & Results)     │  │  PostgreSQL (Neon)   │   │
│  ├──────────────────────────────────┤  ├──────────────────────┤   │
│  │  EVENT_RESULTS collection        │  │  champions_count     │   │
│  │  ┌────────────────────────────┐  │  │  table               │   │
│  │  │ eventId: "EVNT001"         │  │  │  ┌────────────────┐  │   │
│  │  │ eventName: "Tic-Tac-Toe"   │  │  │  │ deptId: DEPT001│  │   │
│  │  │ winnersDept: "DEPT001"     │  │  │  │ count: 5       │  │   │
│  │  │ winnersDeptName: "CSE"     │  │  │  └────────────────┘  │   │
│  │  │ runnersDept: "DEPT002"     │  │  │                      │   │
│  │  │ runnersDeptName: "ECE"     │  │  │                      │   │
│  │  │ coordinatorId: "COORD001"  │  │  │                      │   │
│  │  │ submittedAt: timestamp     │  │  │                      │   │
│  │  └────────────────────────────┘  │  │                      │   │
│  └──────────────────────────────────┘  └──────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Request Flow: Submit Event Result

```
1. Coordinator fills form in Admin Panel
   ↓
2. Select Event: "Tic-Tac-Toe - EVNT001" (from /api/champions/events)
   ↓
3. Select Winner: "Computer Science - DEPT001" (from /api/champions/departments)
   ↓
4. Select Runner: "Electronics - DEPT002" (from /api/champions/departments)
   ↓
5. Click Submit
   ↓
6. POST /api/admin/submit-result
   {
     "coordinatorId": "COORD001",
     "eventId": "EVNT001",
     "winnersDept": "DEPT001",
     "runnersDept": "DEPT002"
   }
   ↓
7. AdminService.submitResult()
   ├─ Validate eventId (EVNT001 exists? ✓)
   ├─ Validate winnersDept (DEPT001 exists? ✓)
   ├─ Validate runnersDept (DEPT002 exists? ✓)
   ├─ Lookup eventName: "Tic-Tac-Toe"
   ├─ Lookup winnersDeptName: "Computer Science and Engineering"
   ├─ Lookup runnersDeptName: "Electronics and Communication Engineering"
   ├─ Save to MongoDB EVENT_RESULTS
   └─ Call championsCounter("DEPT001", "DEPT002")
   ↓
8. ChampionsService.championsCounter()
   ├─ Update count for DEPT001:
   │  ├─ Find existing: count = 4
   │  ├─ Increment: count = 5
   │  └─ Save to champions_count table
   └─ Update count for DEPT002:
      ├─ Find existing: count = 2
      ├─ Increment: count = 3
      └─ Save to champions_count table
   ↓
9. Return success to frontend
   ↓
10. Display success message
```

## Leaderboard Update Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Home Page Load                         │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            GET /api/champions/leaderboard                   │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           ChampionsService.getLeaderboard()                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 1. Fetch all from champions_count table              │  │
│  │ 2. Sort by count DESC                                │  │
│  │ 3. Take top 5                                        │  │
│  │ 4. For each entry:                                   │  │
│  │    - Get deptName from DepartmentConstants           │  │
│  │    - Create response object with id, name, count     │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Return JSON:                             │
│  [                                                          │
│    { "deptId": "DEPT001", "deptName": "CSE", "count": 5 }, │
│    { "deptId": "DEPT003", "deptName": "Mech", "count": 4 },│
│    { "deptId": "DEPT002", "deptName": "ECE", "count": 3 }, │
│    { "deptId": "DEPT007", "deptName": "IT", "count": 2 },  │
│    { "deptId": "DEPT005", "deptName": "EE", "count": 1 }   │
│  ]                                                          │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│               Display on Home Page:                         │
│                                                             │
│   🏆 Champions Leaderboard                                  │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                        │
│   🥇 1. Computer Science and Engineering          5 wins   │
│   🥈 2. Mechanical Engineering                    4 wins   │
│   🥉 3. Electronics and Communication Eng...      3 wins   │
│      4. Information Technology                    2 wins   │
│      5. Electrical Engineering                    1 wins   │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                        │
│   Updates automatically every 5 minutes                     │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ After 5 minutes
                         ▼
                   Refresh (repeat)
```

## Auto-Refresh Mechanism

```typescript
// In HomeComponent
ngOnInit() {
  this.loadLeaderboard();  // Load immediately
  
  // Refresh every 5 minutes (300000ms)
  this.refreshSubscription = interval(300000).subscribe(() => {
    this.loadLeaderboard();  // Reload data
  });
}

loadLeaderboard() {
  this.adminService.getLeaderboard().subscribe({
    next: (leaderboard) => {
      this.leaderboard = leaderboard;  // Update display
    }
  });
}
```

## Data Validation Flow

```
┌─────────────────────────────────────────────────────────────┐
│           POST /api/admin/submit-result                     │
│  {                                                          │
│    "eventId": "EVNT999",        ← Invalid!                  │
│    "winnersDept": "DEPT001",                                │
│    "runnersDept": "DEPT002"                                 │
│  }                                                          │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         AdminService.submitResult()                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ if (!EventConstants.isValidEventId("EVNT999"))        │  │
│  │   throw IllegalArgumentException(                     │  │
│  │     "Invalid event ID: EVNT999"                       │  │
│  │   )                                                   │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Return Error Response                       │
│  HTTP 500 Internal Server Error                            │
│  {                                                          │
│    "message": "Invalid event ID: EVNT999"                   │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

## Constants Management

```java
// EventConstants.java
private static final Map<String, String> EVENT_MAP = new HashMap<>();

static {
    EVENT_MAP.put("EVNT001", "Tic-Tac-Toe");
    EVENT_MAP.put("EVNT012", "Chess");
    EVENT_MAP.put("EVNT004", "BDRF");
    EVENT_MAP.put("EVNT006", "Carrom");
}

// To add a new event:
// 1. Add entry to EVENT_MAP
// 2. Restart backend
// 3. New event appears in dropdown automatically
```

```java
// DepartmentConstants.java
private static final Map<String, String> DEPARTMENT_MAP = new HashMap<>();

static {
    DEPARTMENT_MAP.put("DEPT001", "Computer Science and Engineering");
    DEPARTMENT_MAP.put("DEPT002", "Electronics and Communication Engineering");
    // ... 10 more departments
}

// To add a new department:
// 1. Add entry to DEPARTMENT_MAP
// 2. Restart backend
// 3. New department appears in dropdown automatically
```

## Key Features Implemented

✅ **Immediate Updates**: Champions count updated immediately after result submission
✅ **Auto-Refresh**: Leaderboard refreshes every 5 minutes without page reload
✅ **Data Validation**: All IDs validated before saving to database
✅ **Rich Display**: Names displayed instead of IDs for better UX
✅ **Top 5 Ranking**: Only top 5 departments shown on leaderboard
✅ **Visual Hierarchy**: Medals for top 3 positions
✅ **Centralized Constants**: Easy to add new events/departments
✅ **Dual Database**: MongoDB for events, PostgreSQL for leaderboard
✅ **Clean Architecture**: Separation of concerns (Controller → Service → Repository)
✅ **Error Handling**: Proper validation with meaningful error messages
