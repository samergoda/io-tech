import formReducer from "@/lib/redux/features/forms/formSlice";
import languageReducer from "@/lib/redux/features/language/languageSlice";
import searchReducer from "@/lib/redux/features/search/searchSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    language: languageReducer,
    forms: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
