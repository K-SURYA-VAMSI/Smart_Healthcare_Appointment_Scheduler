# Setup Guide

Complete step-by-step guide to set up and run the Smart Healthcare Appointment Scheduler project.

---

## 📋 System Requirements

### Required Software
- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **MongoDB**: v6.0 or higher ([Download](https://www.mongodb.com/try/download/community))
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### Required Accounts
1. **Twilio Account** - For SMS notifications ([Sign up](https://www.twilio.com/try-twilio))
2. **Anthropic Account** - For Claude AI API ([Sign up](https://www.anthropic.com/))
3. **MongoDB Atlas** (Optional) - For cloud database ([Sign up](https://www.mongodb.com/cloud/atlas/register))

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd "Smart Healthcare Appointment Scheduler"
```

---

## 🗄️ MongoDB Setup

### Option A: Local MongoDB

**Install MongoDB**:
- Download and install MongoDB Community Edition
- Start MongoDB service:

**Windows**:
```bash
net start MongoDB
```

**macOS/Linux**:
```bash
sudo systemctl start mongod
```

**Verify Installation**:
```bash
mongod --version
```

Your connection string will be:
```
mongodb://localhost:27017/healthcare-scheduler
```

### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (free tier available)
3. Create database user:
   - Go to Database Access
   - Add New Database User
   - Set username and password
4. Whitelist your IP:
   - Go to Network Access
   - Add IP Address
   - Choose "Allow Access from Anywhere" (for development)
5. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/healthcare-scheduler?retryWrites=true&w=majority
```

---

## 📱 Twilio Setup

### 1. Create Twilio Account

1. Sign up at [Twilio](https://www.twilio.com/try-twilio)
2. Complete phone verification
3. Get trial phone number (free)

### 2. Get Credentials

Navigate to Twilio Console Dashboard:

- **Account SID**: Found on dashboard home
- **Auth Token**: Found on dashboard home (click to reveal)
- **Phone Number**: Your Twilio phone number

**Format**: `+1234567890` (include country code)

### 3. Configure Trial Account (Optional)

For trial accounts, you can only send SMS to verified phone numbers:

1. Go to Phone Numbers → Verified Caller IDs
2. Add and verify your test phone numbers

---

## 🤖 Claude AI Setup

### 1. Create Anthropic Account

1. Sign up at [Anthropic](https://www.anthropic.com/)
2. Navigate to API section
3. Generate API key

### 2. Get API Key

1. Go to Settings → API Keys
2. Create new API key
3. Copy the key immediately (won't be shown again)

**Note**: The project uses `claude-3-haiku-20240307` model for cost efficiency.

---

## ⚙️ Backend Configuration

### 1. Navigate to Backend

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create `.env` file in the `backend` directory:

```bash
# Windows
type nul > .env

# macOS/Linux
touch .env
```

### 4. Configure Environment Variables

Open `.env` and add:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/healthcare-scheduler

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Twilio SMS Service
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Claude AI
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important**:
- Replace all placeholder values with your actual credentials
- For `JWT_SECRET`, use a long random string (minimum 32 characters)
- Keep `.env` file secure and never commit it to version control

### 5. Verify Setup

```bash
npm run dev
```

You should see:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

---

## 🎨 Frontend Configuration

### 1. Navigate to Frontend

Open a new terminal:

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify API Configuration

The frontend is pre-configured to connect to `http://localhost:5000`.

If you need to change the backend URL, edit `frontend/src/api/axios.js`:

```javascript
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});
```

### 4. Start Development Server

```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 🧪 Testing the Setup

### 1. Check Backend Health

Open browser or use curl:

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 2. Check MongoDB Connection

Look for this in backend terminal:
```
MongoDB connected successfully
```

### 3. Access Frontend

Open browser: `http://localhost:5173`

You should see the login/signup page.

---

## 👥 Creating Test Accounts

### 1. Register Patient Account

1. Click "Create Account"
2. Fill in details:
   - Name: Test Patient
   - Email: patient@test.com
   - Phone: +1234567890 (use verified Twilio number for trial)
   - Password: test123
   - Role: Patient
3. Click "Create Account"

### 2. Register Doctor Account

1. Logout if logged in
2. Click "Create Account"
3. Fill in details:
   - Name: Dr. Test
   - Email: doctor@test.com
   - Phone: +1987654321
   - Password: test123
   - Role: Doctor
4. Click "Create Account"
5. Create doctor profile:
   - Specialization: Cardiologist
   - Experience: 10
   - Consultation Duration: 30

### 3. Set Doctor Availability

As doctor:
1. Select future date
2. Set working hours: 09:00 to 17:00
3. Add break: 12:00 to 13:00
4. Click "Set Availability"

### 4. Book Appointment

As patient:
1. Logout and login as patient
2. Select doctor
3. Choose date
4. Click "Get AI Slots"
5. Book a suggested slot

You should receive SMS confirmations on both numbers (if using verified numbers).

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error**: `Port 5000 is already in use`
- Solution: Change PORT in `.env` or kill process using port 5000

**Error**: `MongoDB connection failed`
- Check if MongoDB is running: `mongod --version`
- Verify MONGO_URI in `.env`
- For Atlas, check IP whitelist and credentials

### Frontend Won't Start

**Error**: `Port 5173 is already in use`
- Solution: Kill process or frontend will prompt to use different port

**Error**: Network errors when calling API
- Ensure backend is running on correct port
- Check `baseURL` in `frontend/src/api/axios.js`
- Verify CORS settings in `backend/src/app.js`

### SMS Not Sending

**Issue**: SMS not received
- Verify Twilio credentials in `.env`
- For trial accounts, verify recipient phone number in Twilio console
- Check phone number format includes country code
- View backend logs for error messages

### AI Suggestions Failing

**Error**: `AI service error`
- Verify Claude API key is correct
- Check API rate limits
- Ensure doctor has set availability for selected date
- Check backend logs for detailed error

### Authentication Issues

**Issue**: Can't login or session expires immediately
- Clear browser cookies and cache
- Check JWT_SECRET is set in `.env`
- Verify backend is sending cookies (check browser dev tools)

---

## 📦 Optional: Using Docker (Advanced)

If you prefer Docker setup, you can create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      - MONGO_URI=mongodb://mongodb:27017/healthcare-scheduler

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

---

## 🔒 Security Best Practices

### Development
- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ Keep `.env` file secure
- ✅ Use environment variables for all sensitive data

### Production
- ✅ Set `secure: true` for cookies in HTTPS
- ✅ Enable CORS only for your frontend domain
- ✅ Use MongoDB Atlas with IP whitelist
- ✅ Rotate API keys regularly
- ✅ Enable rate limiting
- ✅ Use strong passwords for database users

---

## 📝 Next Steps

After successful setup:

1. ✅ Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
2. ✅ Review [README.md](README.md) for feature overview
3. ✅ Explore the codebase structure
4. ✅ Test all features with different roles
5. ✅ Check backend logs for any warnings

---

## 💡 Development Tips

### Useful Commands

**Backend**:
```bash
npm run dev          # Start with nodemon (auto-restart)
```

**Frontend**:
```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build
```

### Recommended VS Code Extensions

- ESLint
- Prettier
- MongoDB for VS Code
- Thunder Client (API testing)
- Tailwind CSS IntelliSense

### Testing APIs

Use tools like:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- Browser dev tools

---

## 🆘 Getting Help

If you encounter issues not covered here:

1. Check backend console logs for detailed errors
2. Check browser console for frontend errors
3. Review MongoDB logs for database issues
4. Verify all environment variables are set correctly
5. Ensure all services (MongoDB, backend, frontend) are running

---

**Setup complete! 🎉 You're ready to start developing!**
