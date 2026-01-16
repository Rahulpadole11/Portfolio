import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sectionsAPI, experiencesAPI } from '../../services/apiService';

// Thunks
export const fetchSectionData = createAsyncThunk(
  'sections/fetchSectionData',
  async (section, { rejectWithValue }) => {
    try {
      // If section is 'experience', use experiences API instead
      if (section === 'experience') {
        const data = await experiencesAPI.getExperiences();
        return { section, data: { data } };
      }
      const data = await sectionsAPI.getSectionData(section);
      return { section, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSectionData = createAsyncThunk(
  'sections/updateSectionData',
  async ({ section, data }, { rejectWithValue }) => {
    try {
      const result = await sectionsAPI.updateSectionData(section, data);
      return { section, data: result };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const sectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    about: {
      name: 'Rahul Padole',
      role: 'Full-Stack Developer',
      about: '',
    },
    skills: {
      frontend: [],
      backend: [],
    },
    experience: [],
    contact: {
      email: '',
      location: '',
      phone: '',
      linkedin: '',
      github: '',
      twitter: '',
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch section data
    builder
      .addCase(fetchSectionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSectionData.fulfilled, (state, action) => {
        state.loading = false;
        const { section, data } = action.payload;
        // For experience section (array), directly use data.data
        // For other sections (objects), use data.data
        if (section === 'experience') {
          state[section] = Array.isArray(data.data) ? data.data : [];
        } else {
          state[section] = data.data || data || state[section];
        }
      })
      .addCase(fetchSectionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update section data
    builder
      .addCase(updateSectionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSectionData.fulfilled, (state, action) => {
        state.loading = false;
        const { section, data } = action.payload;
        // For experience section (array), directly use data.data
        // For other sections (objects), use data.data
        if (section === 'experience') {
          state[section] = Array.isArray(data.data) ? data.data : [];
        } else {
          state[section] = data.data || data || state[section];
        }
      })
      .addCase(updateSectionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = sectionsSlice.actions;
export default sectionsSlice.reducer;
