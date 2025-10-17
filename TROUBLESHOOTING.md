# Quick Troubleshooting Guide - Notification Fetching

## Problem: 403 Forbidden Error on /api/notifications

### ✅ FIXED
This issue has been resolved in this PR by adding `/api/notifications` to the Spring Security permitted endpoints.

---

## How to Verify the Fix Works

### Step 1: Check Backend Logs
When the backend starts, you should see logs like:
```
NotificationController: Received GET request for /api/notifications
NotificationService: Fetching pending notifications from Neon database
NotificationService: Found X pending notifications
NotificationController: Returning X notifications
```

### Step 2: Check Frontend Console
In the browser console, you should see:
```
NotificationService: Making GET request to: /api/notifications
NotificationsComponent: Starting to load notifications...
NotificationsComponent: Successfully loaded notifications: [...]
NotificationsComponent: Number of notifications: X
```

### Step 3: Verify No 403 Errors
The browser console should NOT show:
- ❌ `Failed to load resource: the server responded with a status of 403`
- ❌ `HttpErrorResponse {status: 403}`

---

## If You Still See Issues

### Issue: Backend Won't Start
**Symptom:** `org.postgresql.util.PSQLException: The connection attempt failed`

**Solution:**
1. Check `backend/src/main/resources/application.properties`
2. Verify the Neon database connection string is correct:
   ```properties
   spring.datasource.url=jdbc:postgresql://[YOUR_NEON_HOST]/neondb?...
   spring.datasource.password=[YOUR_PASSWORD]
   ```
3. Ensure you have network access to the Neon database
4. Test the connection with `psql` or a database client

### Issue: Frontend Shows Network Error
**Symptom:** `ERR_CONNECTION_REFUSED` or similar in console

**Solution:**
1. Make sure the backend is running on port 8080
2. Check: `curl http://localhost:8080/api/notifications`
3. Verify proxy configuration in `frontend/proxy.conf.json`
4. Restart the Angular dev server with `npm start`

### Issue: Empty Notifications Array
**Symptom:** Request succeeds (200 OK) but returns `[]`

**Solution:**
This is normal if there are no pending notifications in the database.

To test:
1. Add a test notification to the database
2. Or use the admin panel to create a notification
3. Verify the notification has `status = 'PENDING'`

### Issue: CORS Error
**Symptom:** `Access-Control-Allow-Origin` error in console

**Solution:**
1. Check `SecurityConfig.java` line 42:
   ```java
   configuration.setAllowedOrigins(Arrays.asList(
       "https://cautious-barnacle-6q4pw56rg56f57rq-4200.app.github.dev",
       "http://localhost:4200"
   ));
   ```
2. Add your frontend URL if it's different
3. Restart the backend server

---

## Quick Commands

### Start Backend
```bash
cd backend
mvn clean package -DskipTests
java -jar target/eventmanagement-1.0.0.jar
```

### Start Frontend
```bash
cd frontend
npm install
npm start
```

### Test Notifications Endpoint
```bash
# Test backend endpoint directly
curl http://localhost:8080/api/notifications

# Run verification script
./verify-notifications.sh
```

### Check Backend Logs
```bash
# Backend logs will show in the terminal where you started the server
# Look for lines containing "NotificationController" or "NotificationService"
```

### Check Frontend Logs
```bash
# Open browser DevTools (F12)
# Go to Console tab
# Look for lines containing "NotificationService" or "NotificationsComponent"
```

---

## Database Schema

The notifications are stored in Neon PostgreSQL with this schema:

```sql
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    coordinator_id VARCHAR(255),
    event_id VARCHAR(255),
    message TEXT,
    status VARCHAR(50),  -- 'PENDING', 'APPROVED', 'REJECTED'
    created_at TIMESTAMP,
    type VARCHAR(50)
);
```

To check notifications in the database:
```sql
-- See all pending notifications
SELECT * FROM notifications WHERE status = 'PENDING' ORDER BY created_at DESC;

-- Count notifications by status
SELECT status, COUNT(*) FROM notifications GROUP BY status;
```

---

## Common Mistakes to Avoid

1. ❌ **Don't remove** `/api/notifications` from the permitAll() list
2. ❌ **Don't add authentication** to the public notifications endpoint
3. ❌ **Don't forget to restart** the backend after code changes
4. ❌ **Don't skip the build step** (`mvn clean package`)
5. ❌ **Don't modify** the existing CORS configuration without understanding it

---

## Contact Points

### Backend Endpoint
- **URL:** `http://localhost:8080/api/notifications`
- **Method:** GET
- **Authentication:** Not required (public access)
- **Response:** JSON array of notifications

### Frontend Service
- **File:** `frontend/src/app/services/notification.service.ts`
- **Component:** `frontend/src/app/components/notifications/notifications.component.ts`

### Database
- **Type:** Neon PostgreSQL
- **Table:** `notifications`
- **Config:** `backend/src/main/resources/application.properties`

---

## Success Indicators

✅ Backend starts without errors  
✅ No 403 errors in browser console  
✅ Notifications load in the UI  
✅ Console logs show successful data flow  
✅ Database queries return pending notifications  

---

## Still Having Issues?

1. Check all files match the changes in `CODE_CHANGES.md`
2. Run the verification script: `./verify-notifications.sh`
3. Review the full documentation in `NOTIFICATION_FIX_SUMMARY.md`
4. Check backend and frontend logs for specific error messages
5. Ensure all dependencies are installed (`mvn install` and `npm install`)

**Remember:** The 403 error was caused by Spring Security blocking the endpoint. This has been fixed by adding `/api/notifications` to the permitted list in `SecurityConfig.java`.
