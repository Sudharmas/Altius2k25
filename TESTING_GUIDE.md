# Testing Guide for Champions Leaderboard

## Prerequisites
1. PostgreSQL (Neon) database running and accessible
2. MongoDB running and accessible
3. Backend server started on port 8080
4. Frontend server started on port 4200

## Test Scenario 1: Submit Event Results

### Steps:
1. Login to the application as a coordinator
2. Navigate to Admin Panel
3. Observe the Event dropdown - should show events in format "EventName - EventID"
   - Example: "Tic-Tac-Toe - EVNT001"
4. Observe the Winners Department dropdown - should show departments in format "DeptName - DeptID"
   - Example: "Computer Science and Engineering - DEPT001"
5. Observe the Runners Department dropdown - should show same format

### Expected Data Sources:
- Events loaded from: `/api/champions/events`
- Departments loaded from: `/api/champions/departments`

### Test Data Examples:
```json
Event: "EVNT001" (Tic-Tac-Toe)
Winners: "DEPT001" (Computer Science and Engineering)
Runners: "DEPT002" (Electronics and Communication Engineering)
```

### Expected Backend Behavior:
1. Validates event ID exists in EventConstants
2. Validates winner department ID exists in DepartmentConstants
3. Validates runner department ID exists in DepartmentConstants
4. Saves result to MongoDB with both IDs and names:
   ```json
   {
     "eventId": "EVNT001",
     "eventName": "Tic-Tac-Toe",
     "winnersDept": "DEPT001",
     "winnersDeptName": "Computer Science and Engineering",
     "runnersDept": "DEPT002",
     "runnersDeptName": "Electronics and Communication Engineering"
   }
   ```
5. Immediately calls `championsCounter("DEPT001", "DEPT002")`
6. Champions count database updated:
   - DEPT001 count incremented by 1
   - DEPT002 count incremented by 1

## Test Scenario 2: Champions Count Logic

### Initial State:
Database is empty - no champions_count entries

### Action 1: Submit first result
- Winner: DEPT001
- Runner: DEPT002

### Expected State After Action 1:
```
champions_count table:
+----+---------+-------+
| id | deptId  | count |
+----+---------+-------+
| 1  | DEPT001 | 1     |
| 2  | DEPT002 | 1     |
+----+---------+-------+
```

### Action 2: Submit second result
- Winner: DEPT001 (same as before)
- Runner: DEPT003 (new department)

### Expected State After Action 2:
```
champions_count table:
+----+---------+-------+
| id | deptId  | count |
+----+---------+-------+
| 1  | DEPT001 | 2     | <- incremented
| 2  | DEPT002 | 1     |
| 3  | DEPT003 | 1     | <- new entry
+----+---------+-------+
```

### Action 3: Submit third result
- Winner: DEPT002
- Runner: DEPT001

### Expected State After Action 3:
```
champions_count table:
+----+---------+-------+
| id | deptId  | count |
+----+---------+-------+
| 1  | DEPT001 | 3     | <- incremented (now tied for first)
| 2  | DEPT002 | 2     | <- incremented
| 3  | DEPT003 | 1     |
+----+---------+-------+
```

## Test Scenario 3: Leaderboard Display

### Setup: Create test data with varying counts
```sql
INSERT INTO champions_count (dept_id, count) VALUES
  ('DEPT001', 5),
  ('DEPT002', 4),
  ('DEPT003', 3),
  ('DEPT004', 2),
  ('DEPT005', 1),
  ('DEPT006', 1),
  ('DEPT007', 0);
```

### Expected Leaderboard Response from `/api/champions/leaderboard`:
```json
[
  {
    "deptId": "DEPT001",
    "deptName": "Computer Science and Engineering",
    "count": 5
  },
  {
    "deptId": "DEPT002",
    "deptName": "Electronics and Communication Engineering",
    "count": 4
  },
  {
    "deptId": "DEPT003",
    "deptName": "Mechanical Engineering",
    "count": 3
  },
  {
    "deptId": "DEPT004",
    "deptName": "Civil Engineering",
    "count": 2
  },
  {
    "deptId": "DEPT005",
    "deptName": "Electrical Engineering",
    "count": 1
  }
]
```

Note: Only top 5 are returned, DEPT006 and DEPT007 are excluded

### Expected Home Page Display:
```
🏆 Champions Leaderboard
Top performing departments - Updated live!

┌─────────────────────────────────────────────┐
│ 🥇 1  Computer Science and Engineering      │
│      DEPT001                      5 wins    │
├─────────────────────────────────────────────┤
│ 🥈 2  Electronics and Communication Eng...  │
│      DEPT002                      4 wins    │
├─────────────────────────────────────────────┤
│ 🥉 3  Mechanical Engineering                │
│      DEPT003                      3 wins    │
├─────────────────────────────────────────────┤
│    4  Civil Engineering                     │
│      DEPT004                      2 wins    │
├─────────────────────────────────────────────┤
│    5  Electrical Engineering                │
│      DEPT005                      1 wins    │
└─────────────────────────────────────────────┘

Updates automatically every 5 minutes
```

## Test Scenario 4: Auto-Refresh Functionality

### Setup:
1. Open home page in browser
2. Note the current leaderboard state
3. Keep page open

### Action:
Submit a new result via admin panel that changes the leaderboard

### Expected Behavior:
1. Immediately after submission, leaderboard data in database is updated
2. Home page does NOT immediately reflect the change (unless manually refreshed)
3. After 5 minutes, home page automatically fetches new data
4. Leaderboard updates to show new rankings

### To Test Immediate Update:
1. Submit result via admin panel
2. Manually refresh home page (F5)
3. Leaderboard should show updated rankings immediately

## Test Scenario 5: View Scores Page

### Action:
Navigate to View Scores page

### Expected Display:
Each result card should show:
- Event Name (not ID): "Tic-Tac-Toe"
- Winners Department Name (not ID): "Computer Science and Engineering"
- Runners Department Name (not ID): "Electronics and Communication Engineering"
- Submitted by: coordinator username
- Timestamp

### Fallback Behavior:
If a result was created before the name fields were added:
- Display the ID if name is null
- Example: "DEPT001" instead of full name

## Test Scenario 6: Validation

### Test Invalid Event ID:
```bash
curl -X POST http://localhost:8080/api/admin/submit-result \
  -H "Content-Type: application/json" \
  -d '{
    "coordinatorId": "COORD001",
    "eventId": "INVALID_EVENT",
    "winnersDept": "DEPT001",
    "runnersDept": "DEPT002"
  }'
```

**Expected**: HTTP 500 with error message "Invalid event ID: INVALID_EVENT"

### Test Invalid Winner Department:
```bash
curl -X POST http://localhost:8080/api/admin/submit-result \
  -H "Content-Type: application/json" \
  -d '{
    "coordinatorId": "COORD001",
    "eventId": "EVNT001",
    "winnersDept": "INVALID_DEPT",
    "runnersDept": "DEPT002"
  }'
```

**Expected**: HTTP 500 with error message "Invalid winner department ID: INVALID_DEPT"

## Test Scenario 7: Department and Event Constants

### Verify Department IDs:
```bash
curl http://localhost:8080/api/champions/departments
```

**Expected Response**:
```json
{
  "DEPT001": "Computer Science and Engineering",
  "DEPT002": "Electronics and Communication Engineering",
  "DEPT003": "Mechanical Engineering",
  "DEPT004": "Civil Engineering",
  "DEPT005": "Electrical Engineering",
  "DEPT006": "Aerospace Engineering",
  "DEPT007": "Information Technology",
  "DEPT008": "Biotechnology",
  "DEPT009": "Chemical Engineering",
  "DEPT010": "Master of Business Administration",
  "DEPT011": "Artificial Intelligence and Machine Learning",
  "DEPT012": "Data Science"
}
```

### Verify Event IDs:
```bash
curl http://localhost:8080/api/champions/events
```

**Expected Response**:
```json
{
  "EVNT001": "Tic-Tac-Toe",
  "EVNT012": "Chess",
  "EVNT004": "BDRF",
  "EVNT006": "Carrom"
}
```

## Database Schema Verification

### PostgreSQL (Neon) - champions_count table:
```sql
SELECT * FROM champions_count;

-- Expected columns:
-- id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
-- dept_id (VARCHAR, UNIQUE, NOT NULL)
-- count (INTEGER, NOT NULL, DEFAULT 0)
```

### MongoDB - EVENT_RESULTS collection:
```javascript
db.EVENT_RESULTS.findOne()

// Expected document structure:
{
  "_id": ObjectId("..."),
  "coordinatorId": "COORD001",
  "eventId": "EVNT001",
  "eventName": "Tic-Tac-Toe",
  "winnersDept": "DEPT001",
  "winnersDeptName": "Computer Science and Engineering",
  "runnersDept": "DEPT002",
  "runnersDeptName": "Electronics and Communication Engineering",
  "submittedAt": ISODate("...")
}
```

## Manual Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend builds and starts without errors
- [ ] Can login to application
- [ ] Admin panel loads department dropdown from API
- [ ] Admin panel loads event dropdown from API
- [ ] Dropdowns display in "Name - ID" format
- [ ] Can submit result form successfully
- [ ] Form submission sends only IDs (not names) to backend
- [ ] Champions count increments for both winner and runner
- [ ] View Scores page displays names instead of IDs
- [ ] Home page displays leaderboard
- [ ] Leaderboard shows top 5 departments
- [ ] Leaderboard shows medals for top 3
- [ ] Leaderboard auto-refreshes after 5 minutes
- [ ] Manual refresh shows updated leaderboard immediately
- [ ] Invalid event ID is rejected with error
- [ ] Invalid department ID is rejected with error

## Performance Notes

- Leaderboard query sorts all departments - ensure database index on `count` column
- Auto-refresh interval is 5 minutes (300000ms) - configurable in HomeComponent
- Champions counter uses database transactions to ensure data consistency
