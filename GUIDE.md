# Altius 2k25 User Guide

This guide provides detailed instructions on how to use the Altius 2k25 Event Management System.

## Table of Contents
- [Getting Started](#getting-started)
- [User Roles](#user-roles)
- [Features Guide](#features-guide)
- [Workflow](#workflow)

## Getting Started

### Accessing the Application

1. Open your web browser
2. Navigate to the application URL (e.g., `http://localhost:4200` for development)
3. You will be directed to the home page

### Login

1. Click on "Login" in the navigation bar
2. Enter your USN (University Seat Number)
3. Enter your password
4. Click "Login"

**Note**: Only registered event coordinators can login. Contact the administrator if you need access.

## User Roles

### Admin (Event Coordinator)
- Can view all events and departments
- Can access admin panel
- Can submit event results
- Can view submitted scores
- Can request updates to results

### Administrator
- Has all admin privileges
- Can approve/reject update requests
- Can view and manage notifications

## Features Guide

### 1. Home Page

The home page displays:
- Welcome banner with gradient background
- About Altius 2k25 section
- Featured events carousel
- Staff and student coordinator information with contact details
- Social media links in footer

**Navigation**: Available through the top navigation bar

### 2. Events Page

Browse all events across departments:

1. **Viewing Events**:
   - Events are displayed as cards with posters
   - Each card shows event name and department
   - Click on any event card to view details

2. **Event Details**:
   - Event poster (full size)
   - Event name and department
   - List of coordinators with contact numbers
   - Download rulebook button

3. **Downloading Rulebooks**:
   - Click "Download Rulebook" button on event detail page
   - PDF file will be downloaded automatically

### 3. Departments Page

View all departments:

1. **Browsing Departments**:
   - Departments are shown as cards with photos
   - Click on any department to view its events

2. **Department Events**:
   - Shows all events under selected department
   - Displays event posters and coordinator preview
   - Click on event to view full details

### 4. Admin Panel (Coordinators Only)

Submit event results after completion:

1. **Accessing Admin Panel**:
   - Login first
   - Navigate to Profile → Admin Panel

2. **Submitting Results**:
   - Coordinator ID is auto-filled (your USN)
   - Select event from dropdown
   - Enter winners department (e.g., "Computer Science - CSE")
   - Enter runners department (e.g., "AIML - AIML")
   - Click "Submit Result"

3. **After Submission**:
   - Success message appears
   - Form is reset
   - Data is saved to database

4. **Event Has Ended**:
   - This marks the event as concluded
   - Results are recorded permanently

### 5. View Scores

View and manage submitted results:

1. **Viewing Results**:
   - Login first
   - Navigate to Profile → View Scores
   - See all submitted results

2. **Result Information**:
   - Event ID
   - Winners department
   - Runners department
   - Submitted by (coordinator)
   - Submission timestamp

3. **Requesting Updates**:
   - Click "Request Update" on any result
   - Request is sent to administrator
   - Wait for administrator approval
   - You'll receive confirmation

4. **Why Request Update?**:
   - If you entered wrong department name
   - If there was a scoring error
   - If results need to be changed

### 6. Notifications (Administrator Only)

Manage update requests from coordinators:

1. **Accessing Notifications**:
   - Login as administrator
   - Navigate to Profile → Notifications

2. **Viewing Requests**:
   - See all pending update requests
   - Each request shows:
     - Event ID
     - Request message
     - Coordinator who requested
     - Timestamp

3. **Approving Requests**:
   - Review request details
   - Click "✓ Approve" to accept
   - Status changes to APPROVED

4. **Rejecting Requests**:
   - Review request details
   - Click "✗ Reject" to decline
   - Status changes to REJECTED

## Workflow

### For Event Coordinators

#### Before Event:
1. Login to the system
2. Verify your event details on the Events page
3. Check coordinator information is correct
4. Ensure rulebook is available

#### During Event:
1. Participants can view event details without login
2. They can see posters and download rulebooks
3. They can contact coordinators

#### After Event:
1. Login to admin panel
2. Submit event results:
   - Select your event
   - Enter winners department
   - Enter runners department
   - Submit

3. If mistake made:
   - Go to View Scores
   - Find your event
   - Click "Request Update"
   - Wait for administrator approval

### For Administrator

#### Regular Monitoring:
1. Login as administrator
2. Check notifications regularly
3. Review update requests

#### Processing Requests:
1. Read request details carefully
2. Verify with coordinator if needed
3. Approve or reject request
4. Request status is updated

## Best Practices

### For Coordinators

1. **Double-check before submitting**:
   - Verify department names
   - Confirm winners and runners
   - Review all fields

2. **Keep contact info updated**:
   - Ensure your contact number is correct
   - Update if changed

3. **Download rulebooks in advance**:
   - Test rulebook downloads
   - Ensure files are accessible

4. **Request updates promptly**:
   - Submit update requests as soon as you notice errors
   - Provide clear reasons

### For Administrator

1. **Review requests carefully**:
   - Check request details
   - Contact coordinator if unclear

2. **Process requests promptly**:
   - Regular monitoring
   - Quick response time

3. **Keep records**:
   - Monitor approved/rejected requests
   - Maintain audit trail

## Troubleshooting

### Cannot Login
- Check your USN is correct
- Verify password
- Contact administrator if locked out

### Events Not Showing
- Refresh the page
- Check internet connection
- Ensure backend server is running

### Cannot Download Rulebook
- Check if rulebook file exists
- Verify file path
- Contact administrator

### Results Not Submitting
- Verify all required fields are filled
- Check dropdown selection
- Ensure you're logged in
- Try again after few seconds

### Update Request Not Showing
- Refresh notifications page
- Check if you're logged in as administrator
- Verify request was submitted successfully

## Contact Support

For technical issues or questions:
- Contact system administrator
- Email: admin@altius2k25.edu
- Check README.md for more details

## Security Tips

1. **Keep credentials secure**:
   - Don't share your USN/password
   - Logout after use
   - Use strong passwords

2. **Verify before submitting**:
   - Double-check all data
   - Review before clicking submit

3. **Report issues**:
   - Report suspicious activity
   - Contact admin for account issues

## Frequently Asked Questions

**Q: Can participants login?**
A: No, only event coordinators can login. Participants can view events without logging in.

**Q: How do I change my password?**
A: Contact the administrator to reset your password.

**Q: Can I delete a submitted result?**
A: No, but you can request an update through the administrator.

**Q: How long does update approval take?**
A: Depends on administrator availability. Check notifications page regularly.

**Q: What if my event is not listed?**
A: Contact the administrator to add your event to the system.

**Q: Can I submit results for multiple events?**
A: Yes, you can submit results for any event you coordinate.

**Q: What file formats are supported for posters?**
A: JPG format for posters, PDF for rulebooks.

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**System**: Altius 2k25 Event Management System
