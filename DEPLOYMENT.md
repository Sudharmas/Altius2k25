# Deployment Guide - Altius 2k25

This guide provides step-by-step instructions for deploying the Altius 2k25 Event Management System on various platforms.

## Table of Contents
- [Deployment Options](#deployment-options)
- [Database Setup](#database-setup)
- [Option 1: Separate Deployment](#option-1-separate-deployment)
- [Option 2: Full-Stack Deployment](#option-2-full-stack-deployment)
- [Post-Deployment Steps](#post-deployment-steps)

## Deployment Options

### Option 1: Separate Deployment
- **Frontend**: Vercel, Netlify, or Firebase Hosting
- **Backend**: Render, Railway, or Heroku

### Option 2: Full-Stack Deployment
- **Platform**: Azure App Service, AWS Elastic Beanstalk, or Google Cloud Platform

## Database Setup

Before deploying the application, set up your databases:

### MongoDB Atlas (Free Tier)

1. **Create Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Verify your email

2. **Create Cluster**:
   - Click "Build a Database"
   - Select "M0 Free" tier
   - Choose cloud provider and region (closest to your users)
   - Click "Create Cluster"

3. **Configure Security**:
   - Click "Database Access" → "Add New Database User"
   - Create username and password
   - Set "Built-in Role" to "Read and write to any database"
   
4. **Whitelist IP Addresses**:
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add specific IPs for better security

5. **Create Database and Collections**:
   - Click "Browse Collections"
   - Click "Add My Own Data"
   - Database name: `altius2k25`
   - Collection name: `EVENTS`
   - Click "Create"
   - Create another collection: `CREDENTIALS`

6. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### Neon PostgreSQL (Free Tier)

1. **Create Account**:
   - Go to [Neon](https://neon.tech/)
   - Sign up with GitHub or email
   - Verify your account

2. **Create Project**:
   - Click "New Project"
   - Enter project name: "Altius2k25"
   - Select region (closest to your users)
   - Click "Create Project"

3. **Get Connection String**:
   - Copy the connection string from dashboard
   - Format: `postgresql://username:password@host/database?sslmode=require`
   - Save this for backend configuration

4. **Database will auto-create tables** based on JPA entities when backend starts

## Option 1: Separate Deployment

### Frontend Deployment

#### Deploy to Vercel (Recommended)

1. **Prepare Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow prompts
   - Select project directory
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist/altius-frontend`

4. **Set Environment Variables**:
   - Go to Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add: `API_URL` = Your backend URL

5. **Update Frontend Config**:
   - Edit `src/environments/environment.prod.ts`
   - Set `apiUrl` to your deployed backend URL
   - Redeploy

#### Deploy to Netlify

1. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```
   - Follow prompts
   - Publish directory: `dist/altius-frontend`

4. **Configure**:
   - Create `netlify.toml` in frontend directory:
   ```toml
   [build]
     publish = "dist/altius-frontend"
     command = "npm run build"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Backend Deployment

#### Deploy to Render (Recommended - Free Tier)

1. **Prepare Backend**:
   - Ensure `application.properties` uses environment variables:
   ```properties
   spring.data.mongodb.uri=${MONGODB_URI}
   spring.datasource.url=${POSTGRES_URL}
   spring.datasource.username=${POSTGRES_USERNAME}
   spring.datasource.password=${POSTGRES_PASSWORD}
   ```

2. **Create Render Account**:
   - Go to [Render](https://render.com/)
   - Sign up with GitHub

3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `altius-backend`
     - Environment: `Java`
     - Build Command: `mvn clean package`
     - Start Command: `java -jar target/eventmanagement-1.0.0.jar`

4. **Set Environment Variables**:
   - Add in Render dashboard:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   POSTGRES_URL=<your-neon-connection-string>
   POSTGRES_USERNAME=<your-postgres-username>
   POSTGRES_PASSWORD=<your-postgres-password>
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL

#### Deploy to Railway

1. **Create Railway Account**:
   - Go to [Railway](https://railway.app/)
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**:
   - Railway auto-detects Maven
   - Add environment variables in dashboard
   - Deploy automatically starts

4. **Get URL**:
   - Go to Settings → Domains
   - Generate domain or add custom domain

## Option 2: Full-Stack Deployment

### Deploy to Azure (Student Free Tier)

#### Prerequisites
- Azure for Students account
- Azure CLI installed

#### Steps

1. **Login to Azure**:
   ```bash
   az login
   ```

2. **Create Resource Group**:
   ```bash
   az group create --name altius-rg --location eastus
   ```

3. **Create App Service Plan**:
   ```bash
   az appservice plan create --name altius-plan --resource-group altius-rg --sku F1 --is-linux
   ```

4. **Deploy Backend**:
   ```bash
   cd backend
   mvn clean package
   az webapp create --resource-group altius-rg --plan altius-plan --name altius-backend --runtime "JAVA:17-java17"
   az webapp deploy --resource-group altius-rg --name altius-backend --src-path target/eventmanagement-1.0.0.jar --type jar
   ```

5. **Configure Backend**:
   ```bash
   az webapp config appsettings set --resource-group altius-rg --name altius-backend --settings \
     MONGODB_URI="<your-mongodb-uri>" \
     POSTGRES_URL="<your-postgres-url>" \
     POSTGRES_USERNAME="<your-username>" \
     POSTGRES_PASSWORD="<your-password>"
   ```

6. **Deploy Frontend**:
   ```bash
   cd frontend
   npm run build
   az webapp create --resource-group altius-rg --plan altius-plan --name altius-frontend --runtime "NODE:18-lts"
   cd dist/altius-frontend
   zip -r app.zip .
   az webapp deploy --resource-group altius-rg --name altius-frontend --src-path app.zip --type zip
   ```

### Deploy to Heroku (Free Tier - Eco Dynos)

**Note**: Heroku removed free tier but offers $5/month Eco dynos for students

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login**:
   ```bash
   heroku login
   ```

3. **Deploy Backend**:
   ```bash
   cd backend
   heroku create altius-backend
   heroku config:set MONGODB_URI="<your-uri>"
   heroku config:set POSTGRES_URL="<your-url>"
   git init
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

4. **Deploy Frontend**:
   ```bash
   cd frontend
   heroku create altius-frontend
   heroku buildpacks:set heroku/nodejs
   echo "web: npm start" > Procfile
   git init
   git add .
   git commit -m "Deploy frontend"
   git push heroku main
   ```

## Post-Deployment Steps

### 1. Update Frontend Configuration

Update `frontend/src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.com/api'
};
```

### 2. Configure CORS in Backend

Update `backend/src/main/resources/application.properties`:
```properties
cors.allowed-origins=https://your-frontend-url.com
```

### 3. Add Initial Data

Use MongoDB Compass or Atlas UI to add:

**Credentials**:
```json
{
  "username": "ADMIN001",
  "password": "admin123",
  "role": "ADMINISTRATOR"
}
```

**Sample Event**:
```json
{
  "eventId": "AK25001",
  "departmentId": "CSE",
  "eventName": "TechTalk",
  "posterPath": "AK25001.jpg",
  "rulebookPath": "AK25001.pdf",
  "coordinators": {
    "4SU20CS001": "+91 9876543210"
  }
}
```

### 4. Upload Assets

Upload posters, rulebooks, and department photos:

**For Vercel/Netlify**:
- Place files in `frontend/src/assets/` directories
- Rebuild and redeploy

**For separate storage**:
- Use cloud storage (AWS S3, Cloudinary)
- Update image paths in database

### 5. Test Deployment

1. **Test Frontend**:
   - Open deployed URL
   - Check all pages load
   - Verify navigation works

2. **Test Backend API**:
   ```bash
   curl https://your-backend-url.com/api/events
   ```

3. **Test Login**:
   - Login with test credentials
   - Verify authentication works

4. **Test Database Connection**:
   - Check events load from MongoDB
   - Submit test result
   - Verify data in Neon PostgreSQL

### 6. Set Up Custom Domain (Optional)

#### For Vercel:
1. Go to project settings
2. Add custom domain
3. Update DNS records

#### For Render:
1. Go to service settings
2. Add custom domain
3. Configure DNS

## Monitoring and Maintenance

### Health Checks

Set up monitoring:
- **Render**: Automatic health checks
- **Vercel**: Analytics dashboard
- **Azure**: Application Insights

### Logs

View application logs:
- **Render**: Logs tab in dashboard
- **Vercel**: Functions → Logs
- **Azure**: Log Stream

### Scaling

**Free Tier Limitations**:
- Render: 750 hours/month
- Vercel: 100GB bandwidth
- Neon: 3 projects, 0.5GB storage
- MongoDB Atlas: 512MB storage

**Upgrade Options**:
- Increase resources as needed
- Monitor usage in dashboards

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check `cors.allowed-origins` in backend
   - Verify frontend URL is correct

2. **Database Connection Failed**:
   - Verify connection strings
   - Check IP whitelist in MongoDB Atlas
   - Ensure Neon database is active

3. **Build Failures**:
   - Check Java/Node versions
   - Verify dependencies
   - Review build logs

4. **Environment Variables Not Working**:
   - Verify variable names match
   - Check syntax
   - Restart service after adding variables

5. **Assets Not Loading**:
   - Verify file paths
   - Check CORS for assets
   - Ensure files are deployed

## Cost Estimation (Student)

### Free Tier Usage:
- MongoDB Atlas: Free (512MB)
- Neon PostgreSQL: Free (0.5GB)
- Vercel: Free (Hobby tier)
- Render: Free (Web service)

**Total Monthly Cost**: $0 (within free tier limits)

### Paid Options (if scaling needed):
- MongoDB Atlas M10: $0.08/hour (~$60/month)
- Neon Pro: $19/month
- Vercel Pro: $20/month
- Render Standard: $7/month

## Security Best Practices

1. **Environment Variables**:
   - Never commit credentials
   - Use platform-specific secret management

2. **HTTPS**:
   - Ensure SSL certificates are active
   - Force HTTPS redirects

3. **Database Security**:
   - Use strong passwords
   - Limit IP whitelist where possible
   - Regular backups

4. **API Security**:
   - Implement rate limiting
   - Validate all inputs
   - Use CORS properly

## Backup and Recovery

### Database Backup

**MongoDB Atlas**:
- Automatic backups on M10+ clusters
- Manual export: Tools → Export Collection

**Neon**:
- Automatic backups
- Point-in-time recovery available

### Application Backup

- Keep code in Git repository
- Tag releases
- Document configuration changes

## Support Resources

- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Neon**: [neon.tech/docs](https://neon.tech/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Render**: [render.com/docs](https://render.com/docs)
- **Azure**: [docs.microsoft.com/azure](https://docs.microsoft.com/azure)

---

**Good luck with your deployment!**
