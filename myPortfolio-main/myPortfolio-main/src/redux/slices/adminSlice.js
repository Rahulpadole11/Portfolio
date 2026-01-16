import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectsAPI } from '../../services/apiService';

// Thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const data = await projectsAPI.getProjects();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createNewProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const data = await projectsAPI.createProject(projectData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProjectData = createAsyncThunk(
  'projects/updateProject',
  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      const data = await projectsAPI.updateProject(id, projectData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProjectById = createAsyncThunk(
  'projects/deleteProject',
  async (id, { rejectWithValue }) => {
    try {
      await projectsAPI.deleteProject(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create project
    builder
      .addCase(createNewProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createNewProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items.push(action.payload);
      })
      .addCase(createNewProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update project
    builder
      .addCase(updateProjectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete project
    builder
      .addCase(deleteProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = projectsSlice.actions;
export default projectsSlice.reducer;
