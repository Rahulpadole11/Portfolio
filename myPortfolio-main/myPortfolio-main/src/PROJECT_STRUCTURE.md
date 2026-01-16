# Frontend Project Structure

```
src/
├── App.jsx                 # Main App component
├── App.css                 # Global styles
├── main.jsx               # Entry point
├── index.css              # Global CSS
│
├── pages/                 # Page components
│   └── HomePage.jsx       # Main home page
│
├── components/            # Reusable components
│   ├── Header.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Project.jsx
│   ├── Footer.jsx
│   ├── Contacts.jsx
│   ├── ChatBox.jsx        # Chat form component
│   ├── AdminPanelPro.jsx  # Admin dashboard
│   └── Box.jsx
│
├── hooks/                 # Custom React hooks
│   └── useCustomHooks.js
│       ├── useApi()       # API calls management
│       ├── useForm()      # Form state management
│       ├── useToast()     # Toast notifications
│       └── useModal()     # Modal state management
│
├── context/               # React Context
│   └── AppContext.js      # Global app state
│
├── utils/                 # Utility functions
│   └── api.js             # API calls
│       ├── submitContact()
│       ├── getContacts()
│       ├── getProjects()
│       ├── createProject()
│       ├── deleteProject()
│       └── updateProject()
│
├── constants/             # Application constants
│   └── config.js
│       ├── API_CONFIG
│       ├── ADMIN_CONFIG
│       ├── FORM_CONFIG
│       ├── COLORS
│       └── ANIMATION_DURATION
│
├── styles/                # Shared styles
│   └── (themes, variables, etc.)
│
└── assets/                # Static assets
    └── (images, icons, etc.)
```

## File Organization Best Practices

### Components (src/components/)
- One component per file
- Reusable UI components only
- Use PascalCase for filenames
- Keep components small and focused

### Pages (src/pages/)
- Full page components
- Combine multiple components
- Handle page-level logic

### Hooks (src/hooks/)
- Custom React hooks only
- Reusable logic
- Start filename with `use`

### Context (src/context/)
- Global state management
- Share state across app
- Keep context focused

### Utils (src/utils/)
- Helper functions
- API calls
- Pure functions

### Constants (src/constants/)
- Application-wide constants
- Configuration values
- Never change at runtime

## Usage Examples

### Using API
```javascript
import { getProjects, submitContact } from '../utils/api';

// Fetch projects
const projects = await getProjects();

// Submit contact
const result = await submitContact(formData);
```

### Using Custom Hooks
```javascript
import { useApi, useForm, useToast } from '../hooks/useCustomHooks';

// API hook
const { data, loading, error, execute } = useApi(getProjects);

// Form hook
const { formData, handleChange, resetForm } = useForm(initialState);

// Toast hook
const { message, showMessage } = useToast();
```

### Using Context
```javascript
import { useAppContext } from '../context/AppContext';

const { isAdmin, setIsAdmin } = useAppContext();
```

## Scalability

This structure is designed to scale:
- Easy to add new features
- Clear separation of concerns
- Reusable components and hooks
- Centralized API management
- Global state management

## Performance Tips

1. Use `React.memo()` for expensive components
2. Use `useCallback()` for event handlers
3. Lazy load pages with `React.lazy()`
4. Code split at page level
5. Optimize re-renders with Context carefully

## Import Paths (Optional: Configure Aliases)

Add to `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@context': path.resolve(__dirname, './src/context'),
      '@constants': path.resolve(__dirname, './src/constants'),
    },
  },
})
```

Then use:
```javascript
import ChatBox from '@components/ChatBox'
import { useApi } from '@hooks/useCustomHooks'
import { getProjects } from '@utils/api'
```
