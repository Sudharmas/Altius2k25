# Test Scenarios for Champions Leaderboard

## Scenario 1: First Result Submission

**Given:** No results have been submitted yet
**When:** Coordinator submits:
- Event: EVNT001 (Tic-Tac-Toe)
- Winner: DEPT001 (CSE)
- Runner: DEPT002 (ECE)

**Expected Backend Behavior:**
1. EventResult saved to MongoDB with:
   - coordinatorId, eventId: EVNT001
   - winnersDept: DEPT001
   - runnersDept: DEPT002
   - submittedAt: current timestamp

2. ChampionsService.championsCounter() called with DEPT001 and DEPT002
3. Two records created in champions_count table:
   - { deptId: "DEPT001", count: 1 }
   - { deptId: "DEPT002", count: 1 }

**Expected Frontend Behavior:**
1. Success message displayed
2. Form resets
3. Home page leaderboard shows (on refresh or 5-min interval):
   - 1st: CSE (DEPT001) - 1 win
   - 2nd: ECE (DEPT002) - 1 win

## Scenario 2: Multiple Results for Same Department

**Given:** DEPT001 already has 1 win
**When:** Coordinator submits:
- Event: EVNT012 (Chess)
- Winner: DEPT001 (CSE)
- Runner: DEPT003 (ME)

**Expected Backend Behavior:**
1. EventResult saved to MongoDB
2. ChampionsService.championsCounter() called
3. champions_count table updated:
   - DEPT001: count incremented from 1 to 2
   - DEPT003: new record created with count: 1

**Expected Frontend Behavior:**
1. Leaderboard updates (on refresh):
   - 1st: CSE (DEPT001) - 2 wins
   - 2nd: ECE (DEPT002) - 1 win
   - 3rd: ME (DEPT003) - 1 win

## Scenario 3: Department Wins Both Positions

**Given:** Various departments have different counts
**When:** Coordinator submits:
- Event: EVNT004 (BDRF)
- Winner: DEPT001 (CSE)
- Runner: DEPT001 (CSE)

**Expected Backend Behavior:**
1. EventResult saved
2. ChampionsService.championsCounter() called twice for DEPT001
3. champions_count table updated:
   - DEPT001: count incremented by 2 (from 2 to 4)

**Expected Frontend Behavior:**
1. Leaderboard shows DEPT001 with updated count

## Scenario 4: Leaderboard with More Than 5 Departments

**Given:** 8 departments have wins
**When:** User views home page

**Expected Frontend Behavior:**
1. Only top 5 departments displayed
2. Departments sorted by count (descending)
3. Rank numbers 1-5 displayed
4. Top 3 have special styling with medals

## Scenario 5: Auto-Refresh

**Given:** User is viewing home page
**When:** 5 minutes pass
**Then:** 
1. Leaderboard automatically refreshes
2. No page reload occurs
3. Latest data fetched from backend

## Scenario 6: Dropdown Population

**Given:** User opens admin panel
**When:** Page loads
**Then:**
1. Events dropdown populated with all events from EventConstants
2. Winner department dropdown populated from DepartmentConstants
3. Runner department dropdown populated from DepartmentConstants
4. Each dropdown shows "Name - ID" format

## Scenario 7: Empty Leaderboard

**Given:** No results submitted yet
**When:** User views home page
**Then:**
1. Leaderboard section visible
2. Message displayed: "No results yet. Check back soon!"
3. No error in console

## Scenario 8: API Endpoint Testing

**Test 1: Get Leaderboard**
```bash
curl http://localhost:8080/api/champions/leaderboard
```
Expected: Array of top 5 departments with deptId, deptName, count

**Test 2: Get Departments**
```bash
curl http://localhost:8080/api/champions/departments
```
Expected: Map of all department IDs to names

**Test 3: Get Events**
```bash
curl http://localhost:8080/api/champions/events
```
Expected: Map of all event IDs to names

**Test 4: Submit Result**
```bash
curl -X POST http://localhost:8080/api/admin/submit-result \
  -H "Content-Type: application/json" \
  -d '{
    "coordinatorId": "COORD001",
    "eventId": "EVNT001",
    "winnersDept": "DEPT001",
    "runnersDept": "DEPT002"
  }'
```
Expected: Result saved, champions count updated

## Scenario 9: Database Verification

**MongoDB Check:**
```javascript
db.EVENT_RESULTS.find().pretty()
```
Expected: Results with deptIds, not department names

**Neon PostgreSQL Check:**
```sql
SELECT * FROM champions_count ORDER BY count DESC;
```
Expected: Departments with their counts

## Scenario 10: Mobile Responsiveness

**Given:** User views home page on mobile
**When:** Viewport width < 768px
**Then:**
1. Leaderboard items stack vertically
2. Rank, dept info, and score centered
3. All elements readable and clickable
4. Animations still work

## Expected Error Handling

### Backend Errors:
1. Invalid dept ID → Validation error
2. Missing required field → 400 Bad Request
3. Database connection error → 500 Internal Server Error

### Frontend Errors:
1. API call fails → Error logged in console, user-friendly message
2. Empty response → Show "No data" message
3. Network error → Retry or show error message

## Performance Expectations

1. Leaderboard query should return in < 500ms
2. Result submission should complete in < 1s
3. Auto-refresh should not cause UI lag
4. Dropdown population should be instant

## Security Considerations

1. CORS configured for allowed origins
2. Authentication required for result submission
3. Read-only access for leaderboard (no auth needed)
4. SQL injection prevented by using JPA

## Data Consistency

1. Transaction ensures atomic count updates
2. Unique constraint on deptId prevents duplicates
3. No race conditions with @Transactional
4. MongoDB and PostgreSQL stay in sync
