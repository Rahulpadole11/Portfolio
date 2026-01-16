# Complete Setup Guide - Frontend & Backend Connection

## Prerequisites
- Node.js and npm installed
- MongoDB (local or Atlas cloud)
- VS Code or any code editor

---

## Step 1: Setup Backend

### 1.1 Install Backend Dependencies
```bash
cd backend
npm install
```

### 1.2 Configure MongoDB

**Option A: Local MongoDB (Recommended for Testing)**
1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. The `.env` file already has: `MONGODB_URI=mongodb://localhost:27017/portfolio`

**Option B: MongoDB Atlas (Cloud - No Installation)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster and get connection string
4. Replace `MONGODB_URI` in `.env` with your Atlas connection string

Example:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 1.3 Seed Sample Data (Optional)
```bash
node seed.js
```

### 1.4 Start Backend Server
```bash
npm run dev
```

You should see: `Server running on http://localhost:5000`

---

## Step 2: Setup Frontend

### 2.1 Navigate to Frontend Directory
```bash
cd ../myPortfolio-main
```

### 2.2 Install Frontend Dependencies
```bash
npm install
```

### 2.3 Start Frontend Development Server
```bash
npm run dev
```

You should see: `http://localhost:5173`

---

## Step 3: Test the Connection

1. Open http://localhost:5173 in your browser
2. Scroll to the Chat box (bottom right)
3. Fill in the contact form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Message: Hello!
4. Click "Send"
5. You should see: ✓ Message sent successfully!

---

## API Endpoints Available

### Contacts
- **POST** `/api/contacts` - Submit a contact message
- **GET** `/api/contacts` - Get all contact messages
- **GET** `/api/contacts/:id` - Get specific contact
- **DELETE** `/api/contacts/:id` - Delete contact

### Projects
- **GET** `/api/projects` - Get all projects
- **POST** `/api/projects` - Create new project
- **GET** `/api/projects/:id` - Get specific project
- **PUT** `/api/projects/:id` - Update project
- **DELETE** `/api/projects/:id` - Delete project

---

## Testing with cURL

### Test Contact Submission
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "message": "Hello World!"
  }'
```

### Get All Contacts
```bash
curl http://localhost:5000/api/contacts
```

### Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### Create a Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "A cool project",
    "technologies": ["React", "Node.js"],
    "github": "https://github.com/user/project"
  }'
```

---

## Troubleshooting

### Issue: MongoDB Connection Error
**Solution:** 
- Make sure MongoDB is running
- Verify `MONGODB_URI` in `.env` is correct
- For Atlas, check IP whitelist and connection string

### Issue: CORS Error
**Solution:**
- Backend `.env` has `FRONTEND_URL=http://localhost:5173`
- Make sure frontend is running on port 5173
- Restart both servers

### Issue: 404 Not Found
**Solution:**
- Check backend is running on port 5000
- Verify API endpoints in `src/api.js` match backend routes
- Check browser console for exact error

### Issue: Form not sending
**Solution:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit the form
4. Check if POST request to `http://localhost:5000/api/contacts` is successful
5. Check Console tab for errors

---

## Environment Variables (.env)

```
PORT=5000                                           # Backend port
MONGODB_URI=mongodb://localhost:27017/portfolio    # MongoDB connection
EMAIL_USER=your-email@gmail.com                    # For email notifications
EMAIL_PASSWORD=your-app-password                   # Gmail app password
FRONTEND_URL=http://localhost:5173                 # Frontend URL
NODE_ENV=development                                # Environment
```

---

## File Structure

```
myPortfolio/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── Contact.js            # Contact schema
│   │   └── Project.js            # Project schema
│   ├── controllers/
│   │   ├── contactController.js  # Contact logic
│   │   └── projectController.js  # Project logic
│   ├── routes/
│   │   ├── contactRoutes.js      # Contact routes
│   │   └── projectRoutes.js      # Project routes
│   ├── server.js                 # Main server file
│   ├── seed.js                   # Database seeding
│   ├── package.json
│   ├── .env                      # Environment variables
│   └── .env.example
│
└── myPortfolio-main/
    ├── src/
    │   ├── api.js                # API utility functions
    │   ├── App.jsx               # Main app component
    │   └── components/
    └── package.json
```

---

## Next Steps

1. ✅ Backend running
2. ✅ Frontend running
3. ✅ Contact form connected
4. **TODO:** Add projects API integration to Project component
5. **TODO:** Add email notifications (Gmail setup)
6. **TODO:** Deploy to production (Heroku/Vercel backend, Netlify frontend)

---

## Contact & Support

If you encounter any issues:
1. Check the troubleshooting section
2. Open browser DevTools (F12) and check Console
3. Check both server logs (terminal windows)
