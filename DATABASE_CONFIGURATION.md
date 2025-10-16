# Database Configuration Guide

This guide explains how to configure the databases for the Altius 2k25 Event Management System.

## Overview

The application uses two databases:

1. **MongoDB** - For storing events and user credentials
2. **PostgreSQL or H2** - For storing event results and notifications

## Quick Start (Development)

For local development, the application is pre-configured to work without any database setup:

- **MongoDB**: Uses `mongodb://localhost:27017/altius2k25` (you can install MongoDB locally or skip it for basic testing)
- **PostgreSQL**: Uses H2 in-memory database (no installation required)

Just run:
```bash
cd backend
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## Production Configuration

### Option 1: Using Environment Variables (Recommended)

Set the following environment variables before starting the application:

#### MongoDB Configuration
```bash
export MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/altius2k25?retryWrites=true&w=majority"
```

#### PostgreSQL Configuration (Neon or any PostgreSQL)
```bash
export POSTGRES_URL="jdbc:postgresql://<host>:<port>/<database>?sslmode=require"
export POSTGRES_USERNAME="<username>"
export POSTGRES_PASSWORD="<password>"
export POSTGRES_DRIVER="org.postgresql.Driver"
export HIBERNATE_DIALECT="org.hibernate.dialect.PostgreSQLDialect"
```

Example for Neon PostgreSQL:
```bash
export POSTGRES_URL="jdbc:postgresql://ep-cool-darkness-123456.us-east-2.aws.neon.tech/altius?sslmode=require"
export POSTGRES_USERNAME="myuser"
export POSTGRES_PASSWORD="mypassword123"
export POSTGRES_DRIVER="org.postgresql.Driver"
export HIBERNATE_DIALECT="org.hibernate.dialect.PostgreSQLDialect"
```

Then start the application:
```bash
mvn spring-boot:run
```

### Option 2: Editing application.properties

You can also directly edit `backend/src/main/resources/application.properties`:

1. Copy the example file:
   ```bash
   cd backend/src/main/resources
   cp application.properties.example application.properties
   ```

2. Edit `application.properties` and replace the placeholder values:
   ```properties
   # MongoDB Configuration
   spring.data.mongodb.uri=mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/altius2k25
   
   # PostgreSQL Configuration
   spring.datasource.url=jdbc:postgresql://your-neon-host.neon.tech/altius?sslmode=require
   spring.datasource.username=youruser
   spring.datasource.password=yourpass
   spring.datasource.driver-class-name=org.postgresql.Driver
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
   ```

## Database Setup

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 Free Tier)
4. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Set username and password
   - Grant "Atlas Admin" role
5. Whitelist your IP:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
6. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Neon PostgreSQL Setup

1. Go to [Neon](https://neon.tech/)
2. Create a free account
3. Create a new project
4. Get connection details from the dashboard
5. Use the connection string in your configuration

### Local MongoDB Setup (Optional)

If you prefer to run MongoDB locally:

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```
3. Use the default connection: `mongodb://localhost:27017/altius2k25`

### Local PostgreSQL Setup (Alternative to Neon)

If you want to use a local PostgreSQL instead of Neon:

1. Install PostgreSQL
2. Create a database:
   ```sql
   CREATE DATABASE altius;
   ```
3. Configure the connection:
   ```bash
   export POSTGRES_URL="jdbc:postgresql://localhost:5432/altius"
   export POSTGRES_USERNAME="postgres"
   export POSTGRES_PASSWORD="yourpassword"
   ```

## H2 Database (Development Mode)

The application automatically uses H2 in-memory database when PostgreSQL is not configured. This is perfect for:

- Local development
- Testing
- Quick prototyping
- CI/CD pipelines

### H2 Console Access

When using H2, you can access the database console at:
```
http://localhost:8080/h2-console
```

Connection settings:
- JDBC URL: `jdbc:h2:mem:altius_db`
- Username: `sa`
- Password: (leave empty)

## Troubleshooting

### MongoDB Connection Issues

**Error: "Connection refused" or "MongoSocketOpenException"**

Solutions:
- If using MongoDB Atlas, ensure your IP is whitelisted
- If using local MongoDB, ensure the service is running
- Verify your connection string and credentials
- For development, you can temporarily work without MongoDB (some features will be limited)

### PostgreSQL Connection Issues

**Error: "UnknownHostException" or "Connection refused"**

Solutions:
- Verify your PostgreSQL host and port
- Check your username and password
- Ensure SSL mode is correct (`?sslmode=require` for Neon)
- For development, the application will automatically use H2 as fallback

### Application Won't Start

1. Check if ports 8080 (backend) are available
2. Verify Java 17+ is installed: `java -version`
3. Clear Maven cache: `mvn clean`
4. Check logs for specific error messages

## Configuration Examples

### Development (Local)
```properties
# MongoDB - Local
spring.data.mongodb.uri=mongodb://localhost:27017/altius2k25

# PostgreSQL - H2 Fallback (default, no config needed)
```

### Production (Cloud Services)
```properties
# MongoDB - Atlas
spring.data.mongodb.uri=mongodb+srv://user:pass@cluster0.abc123.mongodb.net/altius2k25

# PostgreSQL - Neon
spring.datasource.url=jdbc:postgresql://ep-cool-darkness-123456.us-east-2.aws.neon.tech/altius?sslmode=require
spring.datasource.username=user
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### Docker Compose (All Local)
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: altius2k25
  
  postgres:
    image: postgres:latest
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: altius
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
```

Then configure:
```bash
export MONGODB_URI="mongodb://localhost:27017/altius2k25"
export POSTGRES_URL="jdbc:postgresql://localhost:5432/altius"
export POSTGRES_USERNAME="postgres"
export POSTGRES_PASSWORD="postgres"
export POSTGRES_DRIVER="org.postgresql.Driver"
export HIBERNATE_DIALECT="org.hibernate.dialect.PostgreSQLDialect"
```

## Environment-Specific Configuration

You can create different configuration files for different environments:

- `application.properties` - Default/Development
- `application-prod.properties` - Production
- `application-test.properties` - Testing

Activate a profile:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

## Security Best Practices

1. **Never commit credentials** to version control
2. **Use environment variables** in production
3. **Rotate passwords** regularly
4. **Enable SSL/TLS** for database connections
5. **Whitelist specific IPs** instead of "Allow from anywhere"
6. **Use strong passwords** for database users
7. **Limit database user permissions** to only what's needed

## Database Schema

The application automatically creates tables using JPA/Hibernate:

### PostgreSQL/H2 Tables
- `event_results` - Stores submitted event results
- `notifications` - Stores update requests and notifications

### MongoDB Collections
- `EVENTS` - Event information
- `CREDENTIALS` - User credentials

## Migration from H2 to PostgreSQL

If you start with H2 and want to migrate to PostgreSQL:

1. Export data from H2 console
2. Set up PostgreSQL database
3. Configure PostgreSQL connection
4. Restart application (tables will be created automatically)
5. Import data if needed

## Support

For database configuration issues:
1. Check this guide first
2. Review error logs carefully
3. Verify connection strings and credentials
4. Try the H2 fallback for development
5. Consult the main README.md for general setup

## Summary

- **Development**: Use default settings (H2 + local MongoDB if needed)
- **Production**: Configure environment variables for MongoDB Atlas and Neon PostgreSQL
- **Testing**: Use H2 in-memory database
- **Flexibility**: The application supports multiple database configurations
