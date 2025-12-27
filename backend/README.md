# Smart Healthcare Appointment Scheduler - Backend

Node.js/Express backend API for the Smart Healthcare Appointment Scheduler.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The server will start on `http://localhost:5000`

## 📚 Documentation

For complete project documentation, please refer to the root directory:

- **[Main README](../README.md)** - Project overview and features
- **[API Documentation](../API_DOCUMENTATION.md)** - Complete API reference
- **[Setup Guide](../SETUP_GUIDE.md)** - Detailed installation instructions

## 🛠️ Technologies

- Node.js
- Express 5.2.1
- MongoDB with Mongoose 9.0.2
- JWT Authentication
- Twilio SMS Service
- Claude AI (Anthropic)

## 📁 Project Structure

```
src/
├── config/          # Database and Twilio configuration
├── controllers/     # Request handlers
├── middlewares/     # Authentication and authorization
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── services/        # Business logic layer
└── utils/           # Utility functions
```

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/healthcare-scheduler
JWT_SECRET=your-secret-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890
CLAUDE_API_KEY=your-claude-api-key
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Doctors
- `POST /api/doctors` - Create doctor profile
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/me` - Get current doctor profile
- `PUT /api/doctors/me` - Update doctor profile

### Availability
- `POST /api/availability` - Set availability
- `GET /api/availability/doctor/:doctorId/:date` - Get availability

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/patient` - Get patient appointments
- `GET /api/appointments/doctor` - Get doctor appointments
- `DELETE /api/appointments/:id` - Cancel appointment

### AI
- `POST /api/ai/suggest-slots` - Get AI slot suggestions

For detailed API documentation, see [API_DOCUMENTATION.md](../API_DOCUMENTATION.md)

## 🔒 Security Features

- JWT-based authentication
- HTTP-only cookies
- Password hashing with bcrypt
- Role-based access control
- Protected routes

## 🧪 Testing

Use tools like Postman or Thunder Client to test API endpoints.

## 📦 Dependencies

```json
{
  "axios": "^1.13.2",
  "bcryptjs": "^3.0.3",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.0.2",
  "twilio": "^5.11.1"
}
```

## 🚀 Deployment

1. Set all environment variables on hosting platform
2. Change cookie `secure: false` to `secure: true` for HTTPS
3. Update CORS origin to your frontend domain
4. Use production MongoDB connection string
