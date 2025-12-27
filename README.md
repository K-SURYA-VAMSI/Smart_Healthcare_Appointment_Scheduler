# Smart Healthcare Appointment Scheduler 🏥

An intelligent healthcare appointment scheduling system that uses AI to suggest optimal booking slots for patients and doctors. The system handles availability management, conflict detection, automated SMS notifications, and provides a modern, user-friendly interface.

## 🚀 Features

### For Patients
- **Smart Booking System** - Book appointments with available doctors
- **AI-Powered Slot Suggestions** - Get optimal time slot recommendations using Claude AI
- **Appointment Management** - View and cancel appointments
- **SMS Notifications** - Receive booking confirmations and updates via SMS
- **Doctor Search** - Browse doctors by specialization

### For Doctors
- **Profile Management** - Create and update professional profiles
- **Availability Setting** - Define working hours and break times
- **Appointment Overview** - View scheduled appointments
- **Automated Notifications** - Get SMS alerts for new bookings and cancellations

### System Features
- **Conflict Detection** - Prevents double-booking automatically
- **AI Time-Slot Optimization** - Claude AI analyzes availability and suggests best slots
- **Real-time Availability** - Dynamic slot generation based on doctor schedules
- **Secure Authentication** - JWT-based authentication with HTTP-only cookies
- **Role-Based Access** - Separate patient and doctor interfaces

## 🛠️ Technologies Used

### Frontend
- **React 19.2.0** - Modern UI library
- **Vite 7.2.4** - Fast build tool and dev server
- **TailwindCSS 3.4.19** - Utility-first CSS framework
- **Axios 1.13.2** - HTTP client for API calls
- **React Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.2.1** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 9.0.2** - MongoDB object modeling

### External Services
- **Claude API (Haiku)** - AI for intelligent slot suggestions
- **Twilio** - SMS notification service

### Security & Authentication
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **HTTP-only Cookies** - Secure token storage

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Twilio Account** (for SMS notifications)
- **Claude API Key** (Anthropic account)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Smart Healthcare Appointment Scheduler"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/healthcare-scheduler
JWT_SECRET=your-super-secret-jwt-key-change-this

# Twilio Configuration
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Claude AI Configuration
CLAUDE_API_KEY=your-claude-api-key
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

The frontend is configured to connect to `http://localhost:5000` by default (see `frontend/src/api/axios.js`).

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
Smart Healthcare Appointment Scheduler/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and Twilio configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # Authentication and role middleware
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic layer
│   │   └── utils/           # Utility functions
│   ├── server.js            # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios configuration
│   │   ├── auth/            # Authentication components
│   │   ├── common/          # Shared components (Navbar)
│   │   ├── doctor/          # Doctor-specific components
│   │   ├── patient/         # Patient-specific components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   └── package.json
│
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account identifier | Yes |
| `TWILIO_AUTH_TOKEN` | Twilio authentication token | Yes |
| `TWILIO_PHONE_NUMBER` | Twilio phone number (with country code) | Yes |
| `CLAUDE_API_KEY` | Anthropic Claude API key | Yes |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (patient/doctor)
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Doctors
- `POST /api/doctors` - Create doctor profile
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/me` - Get current doctor's profile
- `PUT /api/doctors/me` - Update current doctor's profile

### Availability
- `POST /api/availability` - Set doctor availability
- `GET /api/availability/doctor/:doctorId/:date` - Get availability for specific date

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/patient` - Get patient's appointments
- `GET /api/appointments/doctor` - Get doctor's appointments
- `DELETE /api/appointments/:id` - Cancel appointment

### AI Suggestions
- `POST /api/ai/suggest-slots` - Get AI-suggested time slots

### Health Check
- `GET /api/health` - Server health check

## 🎨 User Interface

### Color Theme
The application uses a modern **teal/cyan/emerald** color palette specifically chosen for healthcare applications:
- Primary: Teal (#14b8a6) and Cyan (#06b6d4)
- Success/Notifications: Emerald/Green
- Gradients and smooth transitions throughout

### Responsive Design
- Fully responsive layouts for mobile, tablet, and desktop
- Custom scrollbar styling
- Modern card-based UI with shadows and gradients
- Emoji icons for visual appeal

## 🤖 AI Integration

The system uses **Claude AI (Haiku model)** to analyze:
- Doctor's working hours
- Existing appointments
- Break times
- Consultation duration

And intelligently suggests optimal time slots that maximize booking efficiency while respecting all constraints.

## 📱 SMS Notifications

Automated SMS notifications are sent for:
- ✅ Appointment confirmations (to both patient and doctor)
- ❌ Appointment cancellations (to both patient and doctor)

Notifications are sent via Twilio and are non-blocking to ensure system reliability.

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **HTTP-only Cookies** - Prevents XSS attacks
- **Role-Based Access Control** - Separate patient/doctor permissions
- **Protected Routes** - Middleware-based authorization

## 🧪 Testing the Application

### Create Test Accounts

1. **Register as Patient**:
   - Navigate to signup page
   - Select "Patient" role
   - Fill in details with valid phone number (with country code)

2. **Register as Doctor**:
   - Navigate to signup page
   - Select "Doctor" role
   - After registration, create doctor profile with specialization

3. **Set Availability** (Doctor):
   - Login as doctor
   - Set working hours and breaks for specific dates

4. **Book Appointment** (Patient):
   - Login as patient
   - Select a doctor and date
   - Get AI suggestions or manually book a slot

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --version`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

### SMS Not Sending
- Verify Twilio credentials in `.env`
- Check phone number format (must include country code: +1234567890)
- Ensure Twilio account has sufficient balance

### AI Suggestions Not Working
- Verify Claude API key is valid
- Check API rate limits
- Ensure doctor has set availability for the selected date

### CORS Errors
- Backend must be running on port 5000
- Frontend must be running on port 5173
- Check CORS configuration in `backend/src/app.js`

## 🚀 Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Change `secure: false` to `secure: true` in auth controller for HTTPS
3. Update CORS origin to your frontend domain
4. Use production MongoDB connection string

### Frontend Deployment

1. Update `baseURL` in `frontend/src/api/axios.js` to your backend URL
2. Build the frontend: `npm run build`
3. Deploy the `dist` folder to hosting service (Vercel, Netlify, etc.)

## 📝 License

This project is created as part of a company assessment task.

## 👥 Support

For issues or questions, please refer to the codebase documentation or contact the development team.

---

**Built with ❤️ using React, Node.js, MongoDB, Claude AI, and Twilio**
