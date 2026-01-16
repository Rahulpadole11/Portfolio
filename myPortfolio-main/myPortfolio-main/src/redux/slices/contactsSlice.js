import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contactsAPI } from '../../services/apiService';

// Thunks
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await contactsAPI.getContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitContact = createAsyncThunk(
  'contacts/submitContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const data = await contactsAPI.submitContact(contactData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContactById = createAsyncThunk(
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

// Slice
const contactsSlice = createSlice({
  name: 'contacts',
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
    // Fetch contacts
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Submit contact
    builder
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items.unshift(action.payload.contact);
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete contact
    builder
      .addCase(deleteContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = contactsSlice.actions;
export default contactsSlice.reducer;
