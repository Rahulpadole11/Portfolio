# Portfolio Backend API

A Node.js/Express backend for your portfolio website with MongoDB database integration.

## Features

- Contact form submission handling
- Project management API
- Email notifications
- CORS enabled
- RESTful API endpoints

## Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Set up environment variables:**
Create a `.env` file in the backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
```

### MongoDB Setup
- Install MongoDB locally or use MongoDB Atlas (cloud)
- Update `MONGODB_URI` in `.env`

### Email Setup (Optional)
- Use Gmail: Generate an [App Password](https://support.google.com/accounts/answer/185833)
- Update `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Contact Form
- `POST /api/contacts` - Create a new contact message
- `GET /api/contacts` - Get all contact messages
- `GET /api/contacts/:id` - Get a specific contact message
- `DELETE /api/contacts/:id` - Delete a contact message

### Projects
- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

## Example Requests

### Create Contact
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }'
```

### Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Awesome Project",
    "description": "A cool project description",
    "technologies": ["React", "Node.js"],
    "link": "https://example.com",
    "github": "https://github.com/user/project"
  }'
```

## Connecting Frontend

Update your frontend contact form to send data to the backend:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Troubleshooting

- **MongoDB connection error**: Ensure MongoDB is running
- **Email not sending**: Check Gmail app password and enable "Less secure apps"
- **CORS error**: Verify `FRONTEND_URL` in `.env` matches your frontend URL

## Next Steps

1. Install dependencies: `npm install`
2. Set up MongoDB and create `.env` file
3. Run `npm run dev` to start the server
4. Update your frontend to call the API endpoints
