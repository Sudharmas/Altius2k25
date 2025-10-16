# System Architecture - Champions Leaderboard

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Angular)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐           ┌──────────────────┐              │
│  │   Admin Panel    │           │   Home Page      │              │
│  │   Component      │           │   Component      │              │
│  ├──────────────────┤           ├──────────────────┤              │
│  │ - Dropdowns for  │           │ - Leaderboard    │              │
│  │   events & depts │           │ - Auto-refresh   │              │
│  │ - Submit results │           │ - Top 5 display  │              │
│  └────────┬─────────┘           └────────┬─────────┘              │
│           │                              │                         │
│           │    ┌──────────────────────┐  │                         │
│           └────┤   Admin Service      ├──┘                         │
│                ├──────────────────────┤                            │
│                │ - submitResult()     │                            │
│                │ - getLeaderboard()   │                            │
│                │ - getDepartments()   │                            │
│                │ - getEventsList()    │                            │
│                └──────────┬───────────┘                            │
│                           │                                         │
└───────────────────────────┼─────────────────────────────────────────┘
                            │ HTTP REST API
                            │
┌───────────────────────────┼─────────────────────────────────────────┐
│                           │                                         │
│                    ┌──────▼───────┐                                │
│                    │  Controllers  │                                │
│                    ├───────────────┤                                │
│   ┌────────────────┤ AdminController│────────────────┐             │
│   │                └───────────────┘                 │             │
│   │                                                   │             │
│   │                ┌───────────────┐                 │             │
│   └────────────────┤ChampionsCtrl  ├─────────────────┘             │
│                    └──────┬────────┘                               │
│                           │                                         │
│                    ┌──────▼───────┐                                │
│                    │   Services    │                                │
│                    ├───────────────┤                                │
│   ┌────────────────┤ AdminService  ├────────────────┐             │
│   │                └───────┬───────┘                 │             │
│   │                        │ calls                   │             │
│   │                ┌───────▼────────┐                │             │
│   │                │ChampionsService│                │             │
│   │                └───────┬────────┘                │             │
│   │                        │                         │             │
│   │            ┌───────────┼───────────┐            │             │
│   │            │           │           │            │             │
└───┼────────────┼───────────┼───────────┼────────────┼─────────────┘
    │            │           │           │            │
    │      ┌─────▼─────┐ ┌──▼───────┐ ┌─▼────────┐  │
    │      │Constants  │ │Repository│ │Repository│  │
    │      │DeptConst  │ │Champions │ │EventResult│ │
    │      │EventConst │ │CountRepo │ │Repository│  │
    │      └───────────┘ └────┬─────┘ └────┬─────┘  │
    │                         │            │         │
    │                         │            │         │
┌───▼─────────────────────────▼────────────▼─────────▼───────┐
│                       DATABASES                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┐       ┌───────────────────────┐ │
│  │  Neon PostgreSQL     │       │  MongoDB Atlas        │ │
│  ├──────────────────────┤       ├───────────────────────┤ │
│  │                      │       │                       │ │
│  │  champions_count     │       │  EVENT_RESULTS        │ │
│  │  ┌────────────────┐  │       │  ┌─────────────────┐  │ │
│  │  │ id             │  │       │  │ id              │  │ │
│  │  │ deptId (unique)│  │       │  │ coordinatorId   │  │ │
│  │  │ count          │  │       │  │ eventId         │  │ │
│  │  └────────────────┘  │       │  │ winnersDept     │  │ │
│  │                      │       │  │ runnersDept     │  │ │
│  │  notifications       │       │  │ submittedAt     │  │ │
│  │                      │       │  └─────────────────┘  │ │
│  └──────────────────────┘       └───────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### 1. Result Submission Flow

```
Coordinator                 Frontend                Backend              Databases
    │                          │                       │                    │
    │  Select Event           │                       │                    │
    │  Select Winner Dept     │                       │                    │
    │  Select Runner Dept     │                       │                    │
    │  Click Submit           │                       │                    │
    ├─────────────────────────>│                       │                    │
    │                          │ POST /submit-result   │                    │
    │                          ├──────────────────────>│                    │
    │                          │  (with dept IDs)      │                    │
    │                          │                       │                    │
    │                          │                       │ Save to MongoDB    │
    │                          │                       ├───────────────────>│
    │                          │                       │                    │
    │                          │                       │ Call championsCounter()
    │                          │                       │                    │
    │                          │                       │ Fetch count        │
    │                          │                       │ for winnerDept     │
    │                          │                       ├───────────────────>│
    │                          │                       │<───────────────────┤
    │                          │                       │ count = 5          │
    │                          │                       │                    │
    │                          │                       │ Update count = 6   │
    │                          │                       ├───────────────────>│
    │                          │                       │                    │
    │                          │                       │ Fetch count        │
    │                          │                       │ for runnerDept     │
    │                          │                       ├───────────────────>│
    │                          │                       │<───────────────────┤
    │                          │                       │ count = 3          │
    │                          │                       │                    │
    │                          │                       │ Update count = 4   │
    │                          │                       ├───────────────────>│
    │                          │                       │                    │
    │                          │<──────────────────────┤                    │
    │                          │  Success Response     │                    │
    │<─────────────────────────┤                       │                    │
    │  "Result submitted       │                       │                    │
    │   successfully!"         │                       │                    │
```

### 2. Leaderboard Display Flow

```
User                      Frontend                Backend              Databases
 │                           │                       │                    │
 │  Visit Home Page         │                       │                    │
 ├─────────────────────────>│                       │                    │
 │                           │                       │                    │
 │                           │ GET /leaderboard      │                    │
 │                           ├──────────────────────>│                    │
 │                           │                       │                    │
 │                           │                       │ SELECT * FROM      │
 │                           │                       │ champions_count    │
 │                           │                       │ ORDER BY count DESC│
 │                           │                       │ LIMIT 5            │
 │                           │                       ├───────────────────>│
 │                           │                       │<───────────────────┤
 │                           │                       │ [top 5 depts]      │
 │                           │                       │                    │
 │                           │                       │ Add dept names     │
 │                           │                       │ from constants     │
 │                           │                       │                    │
 │                           │<──────────────────────┤                    │
 │                           │  [leaderboard data]   │                    │
 │                           │                       │                    │
 │                           │ Display with styling  │                    │
 │<──────────────────────────┤ (medals, animations)  │                    │
 │  See Top 5 Departments    │                       │                    │
 │                           │                       │                    │
 │  ... 5 minutes pass ...   │                       │                    │
 │                           │                       │                    │
 │                           │ Auto-refresh          │                    │
 │                           │ (RxJS interval)       │                    │
 │                           ├──────────────────────>│                    │
 │                           │ GET /leaderboard      │                    │
 │                           │                       │                    │
 │                           │<──────────────────────┤                    │
 │<──────────────────────────┤ Updated leaderboard   │                    │
 │  See Updated Rankings     │                       │                    │
```

### 3. Dropdown Population Flow

```
Coordinator               Frontend                Backend              
    │                        │                       │
    │  Open Admin Panel     │                       │
    ├──────────────────────>│                       │
    │                        │ GET /departments      │
    │                        ├──────────────────────>│
    │                        │                       │ Return map from
    │                        │                       │ DepartmentConstants
    │                        │<──────────────────────┤
    │                        │ {DEPT001: "CSE",...}  │
    │                        │                       │
    │                        │ GET /events           │
    │                        ├──────────────────────>│
    │                        │                       │ Return map from
    │                        │                       │ EventConstants
    │                        │<──────────────────────┤
    │                        │ {EVNT001: "TTT",...}  │
    │                        │                       │
    │                        │ Populate dropdowns    │
    │<───────────────────────┤                       │
    │  See dropdowns filled  │                       │
```

## Component Interactions

### Backend Components

```
┌─────────────────┐
│   Constants     │
│   - DeptConst   │──┐
│   - EventConst  │  │ Used by
└─────────────────┘  │
                     │
┌─────────────────┐  │
│   Entities      │  │
│ - ChampionsCount│──┤
│ - EventResult   │  │
└─────────────────┘  │
                     │
┌─────────────────┐  │
│  Repositories   │  │
│ - ChampionsRepo │<─┤
│ - ResultRepo    │  │
└─────────────────┘  │
                     │
┌─────────────────┐  │
│   Services      │  │
│ - ChampionsServ │<─┘
│ - AdminService  │
└─────────────────┘
        │
        │ Used by
        ▼
┌─────────────────┐
│  Controllers    │
│ - ChampionsCtrl │
│ - AdminCtrl     │
└─────────────────┘
```

### Frontend Components

```
┌─────────────────┐
│    Models       │
│ - ChampionsCount│──┐
│ - EventResult   │  │ Used by
└─────────────────┘  │
                     │
┌─────────────────┐  │
│   Services      │  │
│ - AdminService  │<─┤
│ - EventService  │  │
└─────────────────┘  │
        │            │
        │ Used by    │
        ▼            │
┌─────────────────┐  │
│  Components     │  │
│ - AdminPanel    │<─┘
│ - Home          │
└─────────────────┘
```

## Technology Stack

```
┌──────────────────────────────────────────────────┐
│                   FRONTEND                       │
├──────────────────────────────────────────────────┤
│ Framework:      Angular 17                       │
│ Language:       TypeScript 5.2                   │
│ Styling:        CSS3 with animations             │
│ State Mgmt:     RxJS Observables                 │
│ HTTP Client:    Angular HttpClient               │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│                    BACKEND                       │
├──────────────────────────────────────────────────┤
│ Framework:      Spring Boot 3.2.0                │
│ Language:       Java 17                          │
│ Build Tool:     Maven                            │
│ ORM:            JPA/Hibernate                    │
│ Security:       Spring Security                  │
│ Validation:     Spring Validation                │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│                   DATABASES                      │
├──────────────────────────────────────────────────┤
│ Primary:        Neon PostgreSQL (Serverless)     │
│ Secondary:      MongoDB Atlas (Cloud)            │
│ Purpose:        - PostgreSQL: Structured data    │
│                 - MongoDB: Document storage      │
└──────────────────────────────────────────────────┘
```

## Security & Performance

### Security Measures
- CORS configured for allowed origins
- Authentication required for result submission
- JPA prevents SQL injection
- @Transactional ensures data consistency

### Performance Optimizations
- Separate table for counts (fast queries)
- Indexed deptId column
- Limit 5 for leaderboard query
- Frontend caching with auto-refresh
- Stateless REST APIs

## Scalability Considerations

1. **Database Scaling**
   - Neon PostgreSQL auto-scales
   - MongoDB sharding available
   - Connection pooling configured

2. **Application Scaling**
   - Stateless backend (horizontal scaling)
   - CDN for frontend assets
   - API rate limiting possible

3. **Data Growth**
   - Champions count: 1 row per department (max ~50)
   - Event results: Grows with submissions
   - Auto-archival strategies possible

## Monitoring & Logging

- Spring Boot Actuator endpoints
- Database query logging enabled
- Frontend error logging to console
- Transaction logging with @Transactional
