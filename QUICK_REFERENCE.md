# Quick Reference: Database Configuration

## TL;DR - Get Started in 30 Seconds

```bash
cd backend
mvn spring-boot:run
```

✅ **That's it!** No database setup required. The application runs with H2 in-memory database.

---

## Access Points

| Service | URL | Notes |
|---------|-----|-------|
| Backend API | `http://localhost:8080` | Main application |
| H2 Console | `http://localhost:8080/h2-console` | Database viewer |
| Frontend | `http://localhost:4200` | Angular app |

---

## H2 Console Login

```
JDBC URL: jdbc:h2:mem:altius_db
Username: sa
Password: (leave empty)
```

---

## For Production: Set Environment Variables

### PostgreSQL (Neon)
```bash
export POSTGRES_URL="jdbc:postgresql://your-host.neon.tech/db?sslmode=require"
export POSTGRES_USERNAME="your-user"
export POSTGRES_PASSWORD="your-password"
export POSTGRES_DRIVER="org.postgresql.Driver"
export HIBERNATE_DIALECT="org.hibernate.dialect.PostgreSQLDialect"
```

### MongoDB Atlas
```bash
export MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/altius2k25"
```

---

## Common Commands

### Start Application
```bash
cd backend
mvn spring-boot:run
```

### Build for Production
```bash
cd backend
mvn clean package
java -jar target/eventmanagement-1.0.0.jar
```

### Clean Build
```bash
cd backend
mvn clean compile -DskipTests
```

---

## What Database Is Being Used?

Check the startup logs:

**H2 (Development):**
```
HikariPool-1 - Added connection conn0: url=jdbc:h2:mem:altius_db user=SA
H2 console available at '/h2-console'
```

**PostgreSQL (Production):**
```
HikariPool-1 - Added connection conn0: url=jdbc:postgresql://...
```

---

## Troubleshooting

### Application Won't Start

1. **Check Java version:**
   ```bash
   java -version  # Should be 17+
   ```

2. **Check if port 8080 is free:**
   ```bash
   lsof -i :8080  # Mac/Linux
   netstat -ano | findstr :8080  # Windows
   ```

3. **Clean and rebuild:**
   ```bash
   mvn clean compile
   ```

### "Failed to connect to MongoDB"

✅ **This is OK!** MongoDB is optional for basic testing. The app will still start.

To fix (optional):
- Install MongoDB locally, OR
- Set up MongoDB Atlas and configure `MONGODB_URI`

### Need PostgreSQL Instead of H2?

Set environment variables (see above) or edit `application.properties`

---

## File Locations

| File | Purpose |
|------|---------|
| `backend/src/main/resources/application.properties` | Current config |
| `backend/src/main/resources/application.properties.example` | Template |
| `DATABASE_CONFIGURATION.md` | Full guide |
| `POSTGRESQL_CONNECTION_FIX.md` | Fix details |

---

## Database Tables

The following tables are created automatically:

- **event_results** - Event winners and runners
- **notifications** - Update requests

View them in H2 console or PostgreSQL client.

---

## Security Checklist

For production deployment:

- [ ] Set environment variables (don't hardcode credentials)
- [ ] Use strong passwords
- [ ] Disable H2 console (set `spring.h2.console.enabled=false`)
- [ ] Enable SSL for database connections
- [ ] Whitelist specific IPs
- [ ] Rotate passwords regularly

---

## Quick Links

- **Full Documentation:** [README.md](README.md)
- **Database Guide:** [DATABASE_CONFIGURATION.md](DATABASE_CONFIGURATION.md)
- **Quick Start:** [QUICK_START.md](QUICK_START.md)
- **Fix Details:** [POSTGRESQL_CONNECTION_FIX.md](POSTGRESQL_CONNECTION_FIX.md)

---

## Need Help?

1. Check if your issue is in [DATABASE_CONFIGURATION.md](DATABASE_CONFIGURATION.md)
2. Review [VERIFICATION_REPORT.md](VERIFICATION_REPORT.md) for test results
3. Check application logs for specific errors
4. Open an issue on GitHub with error details

---

**Last Updated:** October 16, 2025  
**Status:** ✅ PostgreSQL connection issue resolved - Application working perfectly!
