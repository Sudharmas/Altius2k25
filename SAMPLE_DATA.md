# Sample Data for MongoDB

This file contains sample data to populate your MongoDB Atlas database.

## CREDENTIALS Collection

```json
[
  {
    "username": "4SU20CS001",
    "password": "password123",
    "role": "ADMIN"
  },
  {
    "username": "4SU20CS002",
    "password": "password123",
    "role": "ADMIN"
  },
  {
    "username": "4SU20IS001",
    "password": "password123",
    "role": "ADMIN"
  },
  {
    "username": "ADMIN001",
    "password": "admin123",
    "role": "ADMINISTRATOR"
  }
]
```

## EVENTS Collection

```json
[
  {
    "eventId": "AK25001",
    "departmentId": "CSE",
    "eventName": "Code Sprint",
    "posterPath": "AK25001.jpg",
    "rulebookPath": "AK25001.pdf",
    "coordinators": {
      "4SU20CS001": "+91 9876543210",
      "4SU20CS002": "+91 9876543211"
    }
  },
  {
    "eventId": "AK25002",
    "departmentId": "CSE",
    "eventName": "Web Warriors",
    "posterPath": "AK25002.jpg",
    "rulebookPath": "AK25002.pdf",
    "coordinators": {
      "4SU20CS003": "+91 9876543212",
      "4SU20CS004": "+91 9876543213"
    }
  },
  {
    "eventId": "AK25003",
    "departmentId": "ISE",
    "eventName": "Tech Quiz",
    "posterPath": "AK25003.jpg",
    "rulebookPath": "AK25003.pdf",
    "coordinators": {
      "4SU20IS001": "+91 9876543214",
      "4SU20IS002": "+91 9876543215"
    }
  },
  {
    "eventId": "AK25004",
    "departmentId": "ECE",
    "eventName": "Circuit Masters",
    "posterPath": "AK25004.jpg",
    "rulebookPath": "AK25004.pdf",
    "coordinators": {
      "4SU20EC001": "+91 9876543216"
    }
  },
  {
    "eventId": "AK25005",
    "departmentId": "MECH",
    "eventName": "Robo Race",
    "posterPath": "AK25005.jpg",
    "rulebookPath": "AK25005.pdf",
    "coordinators": {
      "4SU20ME001": "+91 9876543217",
      "4SU20ME002": "+91 9876543218",
      "4SU20ME003": "+91 9876543219"
    }
  },
  {
    "eventId": "AK25006",
    "departmentId": "AIML",
    "eventName": "ML Challenge",
    "posterPath": "AK25006.jpg",
    "rulebookPath": "AK25006.pdf",
    "coordinators": {
      "4SU20AI001": "+91 9876543220",
      "4SU20AI002": "+91 9876543221"
    }
  },
  {
    "eventId": "AK25007",
    "departmentId": "CSE",
    "eventName": "Hackathon",
    "posterPath": "AK25007.jpg",
    "rulebookPath": "AK25007.pdf",
    "coordinators": {
      "4SU20CS005": "+91 9876543222",
      "4SU20CS006": "+91 9876543223",
      "4SU20CS007": "+91 9876543224"
    }
  },
  {
    "eventId": "AK25008",
    "departmentId": "CIVIL",
    "eventName": "Bridge Building",
    "posterPath": "AK25008.jpg",
    "rulebookPath": "AK25008.pdf",
    "coordinators": {
      "4SU20CV001": "+91 9876543225"
    }
  }
]
```

## How to Import

### Using MongoDB Compass:

1. Open MongoDB Compass
2. Connect to your MongoDB Atlas cluster
3. Select database `altius2k25`
4. For each collection:
   - Click on the collection
   - Click "ADD DATA" → "Insert Document"
   - Paste the JSON data
   - Click "Insert"

### Using MongoDB Atlas UI:

1. Login to MongoDB Atlas
2. Click "Browse Collections"
3. Select `altius2k25` database
4. Select collection
5. Click "INSERT DOCUMENT"
6. Switch to JSON view
7. Paste the data
8. Click "Insert"

### Using mongoimport (Command Line):

```bash
# For CREDENTIALS
mongoimport --uri "your-connection-string" --collection CREDENTIALS --file credentials.json --jsonArray

# For EVENTS
mongoimport --uri "your-connection-string" --collection EVENTS --file events.json --jsonArray
```

## Notes

- Replace phone numbers with actual coordinator numbers
- Update event names and IDs as needed
- Ensure poster and rulebook files exist with matching names
- Add more events as required for your fest
