# Smart Healthcare Appointment Scheduler - Frontend

React-based frontend application for the Smart Healthcare Appointment Scheduler.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 Documentation

For complete project documentation, please refer to the root directory:

- **[Main README](../README.md)** - Project overview and features
- **[API Documentation](../API_DOCUMENTATION.md)** - Complete API reference
- **[Setup Guide](../SETUP_GUIDE.md)** - Detailed installation instructions

## 🛠️ Technologies

- React 19.2.0
- Vite 7.2.4
- TailwindCSS 3.4.19
- Axios 1.13.2

## 📁 Project Structure

```
src/
├── api/             # Axios configuration
├── auth/            # Login and Signup components
├── common/          # Shared components (Navbar)
├── doctor/          # Doctor-specific components
├── patient/         # Patient-specific components
├── pages/           # Page components
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## 🎨 UI Theme

The application uses a modern teal/cyan/emerald color palette specifically designed for healthcare applications.

## 🔧 Configuration

Backend API URL is configured in `src/api/axios.js`:

```javascript
baseURL: "http://localhost:5000/api"
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Building for Production

```bash
npm run build
```

The optimized files will be in the `dist` directory.
