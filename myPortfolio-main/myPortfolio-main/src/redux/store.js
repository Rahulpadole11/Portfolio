import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactsSlice";
import projectsReducer from "./slices/adminSlice";
import uiReducer from "./slices/uiSlice";
import sectionsReducer from "./slices/sectionsSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,              // ✅ FIXED
    contacts: contactsReducer,
    projects: projectsReducer,
    sections: sectionsReducer,
  },
});

export default store;
