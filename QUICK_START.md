# Quick Start Guide - Altius 2k25

This guide will help you get the application running as quickly as possible.

## Prerequisites Check

Run the setup script to verify your environment:

**Linux/Mac:**
```bash
./setup.sh
```

**Windows:**
```cmd
setup.bat
```

## Step 1: Database Setup (5 minutes)

### MongoDB Atlas

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up
2. Create a free M0 cluster (takes ~3-5 minutes)
3. Go to Database Access → Add New Database User
   - Username: `altius`
   - Password: (generate strong password)
   - Role: Atlas Admin
4. Go to Network Access → Add IP Address
   - Click "Allow Access from Anywhere"
5. Click "Connect" on your cluster → "Connect your application"
6. Copy the connection string

### Neon PostgreSQL

1. Visit [Neon](https://neon.tech/) and sign up
2. Create a new project: "Altius2k25"
3. Copy the connection string from dashboard

## Step 2: Configure Application (2 minutes)

Edit `backend/src/main/resources/application.properties`:

```properties
# Replace with your MongoDB connection string
spring.data.mongodb.uri=mongodb+srv://altius:<password>@cluster0.xxxxx.mongodb.net/altius2k25?retryWrites=true&w=majority

# Replace with your Neon connection details
spring.datasource.url=jdbc:postgresql://ep-xxxxx.us-east-2.aws.neon.tech/altius?sslmode=require
spring.datasource.username=your-username
spring.datasource.password=your-password
```

## Step 3: Add Sample Data (3 minutes)

### Using MongoDB Atlas Web Interface

1. Go to MongoDB Atlas → Browse Collections
2. Select `altius2k25` database
3. Click "CREATE COLLECTION" → Collection name: `CREDENTIALS`
4. Click "INSERT DOCUMENT"
5. Switch to JSON view and paste:

```json
{
  "username": "ADMIN001",
  "password": "admin123",
  "role": "ADMINISTRATOR"
}
```

6. Click "Insert"
7. Repeat for `EVENTS` collection with sample event:

```json
{
  "eventId": "AK25001",
  "departmentId": "CSE",
  "eventName": "Code Sprint",
  "posterPath": "AK25001.jpg",
  "rulebookPath": "AK25001.pdf",
  "coordinators": {
    "4SU20CS001": "+91 9876543210"
  }
}
```

For more sample data, see `SAMPLE_DATA.md`

## Step 4: Install Dependencies (5 minutes)

### Backend

```bash
cd backend
mvn clean install -DskipTests
```

### Frontend

```bash
cd frontend
npm install
```

## Step 5: Run the Application

Open two terminal windows:

### Terminal 1: Backend

```bash
cd backend
mvn spring-boot:run
```

Wait until you see: "Started EventManagementApplication"

### Terminal 2: Frontend

```bash
cd frontend
npm start
```

Wait until you see: "Compiled successfully"

## Step 6: Access the Application

Open your browser and navigate to:
```
http://localhost:4200
```

## Step 7: Login

Use the credentials you added:
- Username: `ADMIN001`
- Password: `admin123`

## Common Issues

### Backend won't start

**Error: "Failed to connect to MongoDB"**
- Check your MongoDB connection string
- Ensure IP is whitelisted
- Verify username and password

**Error: "Failed to connect to PostgreSQL"**
- Check Neon connection string
- Ensure database is active
- Verify SSL mode is set

### Frontend won't start

**Error: "Port 4200 is already in use"**
```bash
# Kill the process using port 4200
lsof -ti:4200 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :4200   # Windows (find PID and kill)
```

**Error: "Cannot find module '@angular/core'"**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Can't login

**Error: "Invalid username or password"**
- Verify you added credentials to MongoDB
- Check username and password exactly match
- Ensure backend is running

## Next Steps

1. **Add More Data**: See `SAMPLE_DATA.md` for more events and credentials
2. **Add Assets**: 
   - Place event posters in `/posters` directory (e.g., `AK25001.jpg`)
   - Place rulebooks in `/rulebooks` directory (e.g., `AK25001.pdf`)
   - Place department photos in `/department_photos` (e.g., `CSE.jpg`)
3. **Explore Features**: See `GUIDE.md` for detailed feature documentation
4. **Deploy**: See `DEPLOYMENT.md` for deployment instructions

## Development Tips

### Auto-reload Frontend
The frontend automatically reloads on code changes when running `npm start`

### Auto-reload Backend
Use Spring Boot DevTools or run with:
```bash
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.devtools.restart.enabled=true"
```

### View API Documentation
Backend APIs are available at:
```
http://localhost:8080/api
```

Test endpoints using:
- Postman
- curl
- Browser DevTools

### Check Logs

**Backend logs**: Console output where `mvn spring-boot:run` is running

**Frontend logs**: Browser console (F12 → Console)

## Testing the Application

### Test Authentication
1. Navigate to http://localhost:4200/login
2. Enter credentials
3. Click "Login"
4. Should redirect to home page

### Test Events
1. Navigate to http://localhost:4200/events
2. Should see event cards (if you added events)
3. Click on an event
4. Should see event details

### Test Admin Panel
1. Login first
2. Click "Profile" → "Admin Panel"
3. Fill in the form
4. Click "Submit Result"
5. Should see success message

### Test Notifications (Administrator only)
1. Login as administrator (ADMIN001)
2. Click "Profile" → "Notifications"
3. Should see notification panel

## File Structure at a Glance

```
Altius2k25/
├── backend/                    # Spring Boot application
│   ├── src/main/java/         # Java source code
│   ├── src/main/resources/    # Configuration files
│   └── pom.xml                # Maven dependencies
├── frontend/                   # Angular application
│   ├── src/app/               # Angular components
│   ├── src/environments/      # Environment configs
│   └── package.json           # npm dependencies
├── posters/                   # Event poster images
├── rulebooks/                 # Event rulebook PDFs
├── department_photos/         # Department images
├── README.md                  # Main documentation
├── GUIDE.md                   # User guide
├── DEPLOYMENT.md              # Deployment guide
├── QUICK_START.md             # This file
└── setup.sh / setup.bat       # Setup scripts
```

## Getting Help

If you're stuck:
1. Check the error message carefully
2. Look in the relevant documentation (README.md, GUIDE.md)
3. Check database connections
4. Verify all dependencies are installed
5. Try restarting both backend and frontend

## Success Checklist

- [ ] Prerequisites installed (Java, Maven, Node.js)
- [ ] MongoDB Atlas cluster created
- [ ] Neon PostgreSQL database created
- [ ] Configuration file updated
- [ ] Sample data added to MongoDB
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend running on port 8080
- [ ] Frontend running on port 4200
- [ ] Can access http://localhost:4200
- [ ] Can login with test credentials

**Congratulations! You're ready to use Altius 2k25!** 🎉
