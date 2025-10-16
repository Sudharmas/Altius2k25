# Quick Start Guide - Champions Leaderboard Feature

## For Coordinators

### Submitting Event Results

1. **Login** to the Admin Panel
2. **Select Event** from dropdown:
   - Shows: "Event Name - EVENT_ID"
   - Example: "Tic-Tac-Toe - EVNT001"

3. **Select Winners Department** from dropdown:
   - Shows: "Department Name - DEPT_ID"
   - Example: "Computer Science and Engineering - DEPT001"

4. **Select Runners Department** from dropdown:
   - Choose the runner-up department

5. **Submit** the form
   - Result is saved
   - Both departments get +1 in their count
   - Leaderboard updates automatically

## For Users

### Viewing the Leaderboard

1. **Visit** the home page
2. **Scroll** to the "🏆 Champions Leaderboard" section
3. **View** the top 5 departments:
   - 🥇 1st place - Gold styling
   - 🥈 2nd place - Silver styling
   - 🥉 3rd place - Bronze styling
   - 4th and 5th place - Standard styling

### Auto-Refresh
- Leaderboard automatically refreshes every 5 minutes
- No page reload needed
- Manual refresh also updates the leaderboard

## Department IDs Reference

| Dept ID   | Department Name                               |
|-----------|-----------------------------------------------|
| DEPT001   | Computer Science and Engineering              |
| DEPT002   | Electronics and Communication Engineering     |
| DEPT003   | Mechanical Engineering                        |
| DEPT004   | Civil Engineering                             |
| DEPT005   | Electrical Engineering                        |
| DEPT006   | Aerospace Engineering                         |
| DEPT007   | Information Technology                        |
| DEPT008   | Biotechnology                                 |
| DEPT009   | Chemical Engineering                          |
| DEPT010   | Master of Business Administration             |
| DEPT011   | Artificial Intelligence and Machine Learning  |
| DEPT012   | Data Science                                  |

## Event IDs Reference

| Event ID  | Event Name    |
|-----------|---------------|
| EVNT001   | Tic-Tac-Toe   |
| EVNT012   | Chess         |
| EVNT004   | BDRF          |
| EVNT006   | Carrom        |

## API Endpoints

### For Frontend Developers

**Get Leaderboard:**
```
GET /api/champions/leaderboard
Response: Array of top 5 departments
```

**Get Departments:**
```
GET /api/champions/departments
Response: Map of dept IDs to names
```

**Get Events:**
```
GET /api/champions/events
Response: Map of event IDs to names
```

**Submit Result:**
```
POST /api/admin/submit-result
Body: {
  "coordinatorId": "COORD001",
  "eventId": "EVNT001",
  "winnersDept": "DEPT001",
  "runnersDept": "DEPT002"
}
```

## Troubleshooting

### Leaderboard not showing?
- Check if any results have been submitted
- Verify backend is running
- Check browser console for errors
- Wait for auto-refresh (5 minutes) or manually refresh page

### Dropdown not loading departments/events?
- Check if backend is running on port 8080
- Verify API endpoints are accessible
- Check CORS configuration
- Look for errors in browser console

### Result submission failing?
- Verify all fields are selected
- Check if coordinator is logged in
- Ensure database connection is working
- Check backend logs for errors

## Adding New Departments or Events

### To add a new department:
1. Open `backend/.../constants/DepartmentConstants.java`
2. Add new entry to DEPARTMENT_MAP:
   ```java
   DEPARTMENT_MAP.put("DEPT013", "New Department Name");
   ```
3. Recompile and restart backend

### To add a new event:
1. Open `backend/.../constants/EventConstants.java`
2. Add new entry to EVENT_MAP:
   ```java
   EVENT_MAP.put("EVNT007", "New Event Name");
   ```
3. Recompile and restart backend

## Database Information

**MongoDB (Atlas):**
- Event Results stored in `EVENT_RESULTS` collection
- Each result contains: coordinatorId, eventId, winnersDept, runnersDept, submittedAt

**Neon PostgreSQL:**
- Champions count stored in `champions_count` table
- Each record contains: id, deptId, count
- Table is auto-created on first run

## Support

For issues or questions:
1. Check the CHAMPIONS_LEADERBOARD_IMPLEMENTATION.md file
2. Review backend logs
3. Check browser console for frontend errors
4. Contact the development team
