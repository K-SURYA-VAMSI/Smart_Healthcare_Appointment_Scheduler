# API Documentation

Complete API reference for the Smart Healthcare Appointment Scheduler backend.

**Base URL**: `http://localhost:5000/api`

---

## 🔐 Authentication

All authenticated endpoints require a JWT token sent via HTTP-only cookie.

### Register User

**Endpoint**: `POST /auth/register`

**Description**: Register a new user (patient or doctor)

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phoneNumber": "+1234567890",
  "role": "patient"
}
```

**Fields**:
- `name` (string, required): Full name
- `email` (string, required): Valid email address
- `password` (string, required): Minimum 6 characters
- `phoneNumber` (string, required): Phone with country code
- `role` (string, required): Either "patient" or "doctor"

**Success Response** (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "phoneNumber": "+1234567890"
  }
}
```

**Error Response** (400):
```json
{
  "message": "User already exists"
}
```

---

### Login

**Endpoint**: `POST /auth/login`

**Description**: Authenticate user and receive JWT token

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response** (200):
```json
{
  "message": "Login successful",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

**Note**: JWT token is set as HTTP-only cookie

---

### Logout

**Endpoint**: `POST /auth/logout`

**Description**: Clear authentication cookie

**Success Response** (200):
```json
{
  "message": "Logged out successfully"
}
```

---

### Get Current User

**Endpoint**: `GET /auth/me`

**Description**: Get authenticated user's profile

**Authentication**: Required

**Success Response** (200):
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "patient",
  "phoneNumber": "+1234567890"
}
```

---

## 👨‍⚕️ Doctor Management

### Create Doctor Profile

**Endpoint**: `POST /doctors`

**Description**: Create a doctor profile (doctor only)

**Authentication**: Required (Doctor role)

**Request Body**:
```json
{
  "specialization": "Cardiologist",
  "experience": 10,
  "consultationDuration": 30
}
```

**Fields**:
- `specialization` (string, required): Medical specialization
- `experience` (number, required): Years of experience
- `consultationDuration` (number, optional): Minutes per consultation (default: 30)

**Success Response** (201):
```json
{
  "_id": "doctor_id",
  "userId": "user_id",
  "specialization": "Cardiologist",
  "experience": 10,
  "consultationDuration": 30,
  "createdAt": "2025-12-27T10:00:00.000Z"
}
```

---

### Get All Doctors

**Endpoint**: `GET /doctors`

**Description**: Retrieve list of all doctors

**Authentication**: Required

**Success Response** (200):
```json
[
  {
    "_id": "doctor_id",
    "userId": {
      "_id": "user_id",
      "name": "Dr. Smith",
      "email": "smith@example.com"
    },
    "specialization": "Cardiologist",
    "experience": 10,
    "consultationDuration": 30
  }
]
```

---

### Get Doctor by ID

**Endpoint**: `GET /doctors/:id`

**Description**: Get specific doctor details

**Authentication**: Required

**URL Parameters**:
- `id`: Doctor's MongoDB ObjectId

**Success Response** (200):
```json
{
  "_id": "doctor_id",
  "userId": {
    "_id": "user_id",
    "name": "Dr. Smith",
    "email": "smith@example.com"
  },
  "specialization": "Cardiologist",
  "experience": 10,
  "consultationDuration": 30
}
```

---

### Get Current Doctor Profile

**Endpoint**: `GET /doctors/me`

**Description**: Get authenticated doctor's profile

**Authentication**: Required (Doctor role)

**Success Response** (200):
```json
{
  "_id": "doctor_id",
  "userId": "user_id",
  "specialization": "Cardiologist",
  "experience": 10,
  "consultationDuration": 30
}
```

---

### Update Doctor Profile

**Endpoint**: `PUT /doctors/me`

**Description**: Update authenticated doctor's profile

**Authentication**: Required (Doctor role)

**Request Body**:
```json
{
  "specialization": "Pediatric Cardiologist",
  "experience": 12,
  "consultationDuration": 45
}
```

**Success Response** (200):
```json
{
  "_id": "doctor_id",
  "userId": "user_id",
  "specialization": "Pediatric Cardiologist",
  "experience": 12,
  "consultationDuration": 45
}
```

---

## 📅 Availability Management

### Set Availability

**Endpoint**: `POST /availability`

**Description**: Set doctor availability for a specific date

**Authentication**: Required (Doctor role)

**Request Body**:
```json
{
  "date": "2025-12-28",
  "workingHours": {
    "startTime": "09:00",
    "endTime": "17:00"
  },
  "breaks": [
    {
      "startTime": "12:00",
      "endTime": "13:00"
    }
  ]
}
```

**Fields**:
- `date` (string, required): Date in YYYY-MM-DD format
- `workingHours` (object, required): Start and end times (HH:MM format)
- `breaks` (array, optional): Break periods

**Success Response** (201):
```json
{
  "_id": "availability_id",
  "doctorId": "doctor_id",
  "date": "2025-12-28",
  "workingHours": {
    "startTime": "09:00",
    "endTime": "17:00"
  },
  "breaks": [
    {
      "startTime": "12:00",
      "endTime": "13:00"
    }
  ]
}
```

---

### Get Doctor Availability

**Endpoint**: `GET /availability/doctor/:doctorId/:date`

**Description**: Get doctor's availability for specific date

**Authentication**: Required

**URL Parameters**:
- `doctorId`: Doctor's MongoDB ObjectId
- `date`: Date in YYYY-MM-DD format

**Success Response** (200):
```json
{
  "_id": "availability_id",
  "doctorId": "doctor_id",
  "date": "2025-12-28",
  "workingHours": {
    "startTime": "09:00",
    "endTime": "17:00"
  },
  "breaks": [
    {
      "startTime": "12:00",
      "endTime": "13:00"
    }
  ]
}
```

---

## 📋 Appointment Management

### Book Appointment

**Endpoint**: `POST /appointments`

**Description**: Book a new appointment

**Authentication**: Required (Patient role)

**Request Body**:
```json
{
  "doctorId": "doctor_id",
  "date": "2025-12-28",
  "timeSlot": {
    "startTime": "10:00",
    "endTime": "10:30"
  }
}
```

**Success Response** (201):
```json
{
  "_id": "appointment_id",
  "patientId": "patient_id",
  "doctorId": "doctor_id",
  "date": "2025-12-28",
  "timeSlot": {
    "startTime": "10:00",
    "endTime": "10:30"
  },
  "status": "booked",
  "createdAt": "2025-12-27T10:00:00.000Z"
}
```

**Error Response** (409):
```json
{
  "message": "This time slot is already booked"
}
```

---

### Get Patient Appointments

**Endpoint**: `GET /appointments/patient`

**Description**: Get all appointments for logged-in patient

**Authentication**: Required (Patient role)

**Success Response** (200):
```json
[
  {
    "_id": "appointment_id",
    "patientId": "patient_id",
    "doctorId": {
      "_id": "doctor_id",
      "specialization": "Cardiologist",
      "userId": {
        "name": "Dr. Smith"
      }
    },
    "date": "2025-12-28",
    "timeSlot": {
      "startTime": "10:00",
      "endTime": "10:30"
    },
    "status": "booked"
  }
]
```

---

### Get Doctor Appointments

**Endpoint**: `GET /appointments/doctor`

**Description**: Get all appointments for logged-in doctor

**Authentication**: Required (Doctor role)

**Success Response** (200):
```json
[
  {
    "_id": "appointment_id",
    "patientId": {
      "_id": "patient_id",
      "name": "John Doe"
    },
    "doctorId": "doctor_id",
    "date": "2025-12-28",
    "timeSlot": {
      "startTime": "10:00",
      "endTime": "10:30"
    },
    "status": "booked"
  }
]
```

---

### Cancel Appointment

**Endpoint**: `DELETE /appointments/:id`

**Description**: Cancel an appointment (patient only)

**Authentication**: Required (Patient role)

**URL Parameters**:
- `id`: Appointment's MongoDB ObjectId

**Success Response** (200):
```json
{
  "message": "Appointment cancelled successfully"
}
```

**Error Response** (403):
```json
{
  "message": "You are not authorized to cancel this appointment"
}
```

---

## 🤖 AI Suggestions

### Get AI Suggested Slots

**Endpoint**: `POST /ai/suggest-slots`

**Description**: Get AI-powered time slot suggestions

**Authentication**: Required (Patient role)

**Request Body**:
```json
{
  "doctorId": "doctor_id",
  "date": "2025-12-28"
}
```

**Success Response** (200):
```json
[
  {
    "startTime": "09:00",
    "endTime": "09:30"
  },
  {
    "startTime": "10:00",
    "endTime": "10:30"
  },
  {
    "startTime": "14:00",
    "endTime": "14:30"
  }
]
```

**How It Works**:
- Claude AI analyzes doctor's working hours, breaks, and existing appointments
- Returns optimal time slots based on consultation duration
- Excludes already booked times and break periods

---

## 🏥 Health Check

### Server Health

**Endpoint**: `GET /health`

**Description**: Check if server is running

**Authentication**: Not required

**Success Response** (200):
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 🔒 Authorization Middleware

### Protected Routes
All routes except `/auth/register`, `/auth/login`, and `/health` require authentication via JWT token in HTTP-only cookie.

### Role-Based Access

**Doctor Only**:
- `POST /doctors`
- `GET /doctors/me`
- `PUT /doctors/me`
- `POST /availability`
- `GET /appointments/doctor`

**Patient Only**:
- `POST /appointments`
- `GET /appointments/patient`
- `DELETE /appointments/:id`
- `POST /ai/suggest-slots`

**Both Roles**:
- `GET /doctors`
- `GET /doctors/:id`
- `GET /availability/doctor/:doctorId/:date`
- `GET /auth/me`

---

## 📝 Error Responses

Standard error response format:

```json
{
  "message": "Error description"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Resource created
- `400` - Bad request / Validation error
- `401` - Unauthorized / Not authenticated
- `403` - Forbidden / Insufficient permissions
- `404` - Resource not found
- `409` - Conflict (e.g., time slot already booked)
- `500` - Internal server error

---

## 🔄 Response Formats

### Date Format
All dates use `YYYY-MM-DD` format (e.g., "2025-12-28")

### Time Format
All times use 24-hour `HH:MM` format (e.g., "14:30")

### Phone Number Format
Phone numbers must include country code (e.g., "+1234567890")

---

## 🚀 Rate Limiting

Currently, no rate limiting is implemented. For production deployment, consider adding rate limiting middleware.

---

## 📞 SMS Notifications

SMS notifications are automatically sent via Twilio for:

- **Appointment Booked**: Sent to both patient and doctor
- **Appointment Cancelled**: Sent to both patient and doctor

Notifications are non-blocking and failures don't affect core functionality.

---

For implementation details, refer to the source code in the `backend/src` directory.
