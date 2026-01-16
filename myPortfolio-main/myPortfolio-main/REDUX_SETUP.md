# Redux Setup Documentation

## 📁 Folder Structure

```
src/
├── redux/
│   ├── store.js              # Redux store configuration
│   └── slices/
│       ├── contactsSlice.js  # Contacts state & thunks
│       ├── adminSlice.js     # Projects state & thunks
│       └── uiSlice.js        # UI state (admin panel)
│
├── services/
│   ├── apiClient/
│   │   └── axiosClient.js    # Axios instance with interceptors
│   └── apiService.js         # All API endpoints
│
└── .env                       # Environment variables
```

## 🔧 Environment Variables

Create `.env` file in root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000

# Environment
VITE_APP_ENV=development

# Admin Configuration
VITE_ADMIN_PASSWORD=admin123

# Feature Flags
VITE_ENABLE_REDUX_DEVTOOLS=true
VITE_ENABLE_LOGGING=true
```

## 📦 Required Dependencies

Install these packages:

```bash
npm install @reduxjs/toolkit react-redux axios
```

## 🎯 How to Use

### Accessing Redux State

```javascript
import { useSelector, useDispatch } from 'react-redux';

const MyComponent = () => {
  // Access state
  const { items, loading, error } = useSelector((state) => state.contacts);
  const { isOpen, activeTab } = useSelector((state) => state.admin);
  
  // Dispatch actions
  const dispatch = useDispatch();
};
```

### Dispatching Async Actions

```javascript
import { submitContact, fetchContacts } from '../redux/slices/contactsSlice';

const handleSubmit = async (formData) => {
  try {
    await dispatch(submitContact(formData)).unwrap();
    console.log('Success!');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### API Calls

```javascript
import { contactsAPI, projectsAPI } from '../services/apiService';

// Direct API calls (without Redux)
const contacts = await contactsAPI.getContacts();
const projects = await projectsAPI.getProjects();
```

## 📝 Redux Slices Overview

### Contacts Slice
- `fetchContacts()` - Get all messages
- `submitContact(data)` - Submit new message
- `deleteContactById(id)` - Delete message
- State: `items`, `loading`, `error`, `success`

### Projects Slice (adminSlice.js)
- `fetchProjects()` - Get all projects
- `createNewProject(data)` - Create project
- `updateProjectData({ id, projectData })` - Update project
- `deleteProjectById(id)` - Delete project
- State: `items`, `loading`, `error`, `success`

### UI Slice
- Admin panel state management
- Actions: `setAuthenticated`, `setIsOpen`, `setActiveTab`, `setMessage`, `logout`
- State: `isAuthenticated`, `isOpen`, `activeTab`, `message`

## 🌐 API Client Features

### Interceptors

**Request Interceptor:**
- Logs API requests (when enabled)
- Sets headers
- Adds authentication if needed

**Response Interceptor:**
- Logs successful responses
- Handles errors globally
- Provides detailed error messages

### Usage

```javascript
import { contactsAPI } from '../services/apiService';

// All methods return promises
try {
  const data = await contactsAPI.submitContact(formData);
  const contacts = await contactsAPI.getContacts();
  await contactsAPI.deleteContact(id);
} catch (error) {
  console.error('API Error:', error);
}
```

## 📊 State Structure

```javascript
// Redux State Tree
{
  contacts: {
    items: [],           // Array of contact messages
    loading: false,      // API loading state
    error: null,         // Error message if failed
    success: false,      // Success flag
  },
  projects: {
    items: [],           // Array of projects
    loading: false,
    error: null,
    success: false,
  },
  admin: {
    isAuthenticated: false,  // Admin login status
    isOpen: false,           // Panel visibility
    activeTab: 'dashboard',  // Current tab
    message: '',             // Toast message
    password: '',            // Admin password input
  }
}
```

## 🔐 Admin Panel with Redux

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated, setActiveTab, setMessage } from '../redux/slices/uiSlice';

const AdminPanel = () => {
  const { isAuthenticated, activeTab } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  
  const handleLogin = () => {
    dispatch(setAuthenticated(true));
  };
  
  const switchTab = (tab) => {
    dispatch(setActiveTab(tab));
  };
};
```

## 🛠️ Thunk Patterns

### Basic Thunk
```javascript
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      return await contactsAPI.getContacts();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
```

### Thunk with Parameters
```javascript
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await contactsAPI.deleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
```

## 💡 Best Practices

1. **Use Redux for:** Global state, async operations, complex app state
2. **Use Local State for:** Form inputs, temporary UI states
3. **Keep Slices Focused:** One slice per feature
4. **Use Thunks for:** API calls, side effects
5. **Handle Errors:** Always provide error state and messages
6. **Log API Calls:** Use VITE_ENABLE_LOGGING for debugging

## 🐛 Debugging

Enable Redux DevTools:
```env
VITE_ENABLE_REDUX_DEVTOOLS=true
```

Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension) for browser.

Enable API Logging:
```env
VITE_ENABLE_LOGGING=true
```

## 📚 Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React-Redux Hooks](https://react-redux.js.org/api/hooks)
- [Axios Docs](https://axios-http.com/)
