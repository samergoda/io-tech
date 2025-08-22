import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface LanguageState {
  currentLanguage: "en" | "ar";
  isRTL: boolean;
}

// Helper function to determine if locale is RTL
const isRTLLocale = (locale: string): boolean => {
  return locale === "ar";
};

// Helper function to get initial state from locale
const getInitialStateFromLocale = (locale?: string): LanguageState => {
  const currentLanguage = (locale === "ar" ? "ar" : "en") as "en" | "ar";
  return {
    currentLanguage,
    isRTL: isRTLLocale(currentLanguage),
  };
};

// Default initial state (fallback)
const initialState: LanguageState = {
  currentLanguage: "en",
  isRTL: false,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "ar">) => {
      state.currentLanguage = action.payload;
      state.isRTL = action.payload === "ar";
    },
    toggleLanguage: (state) => {
      state.currentLanguage = state.currentLanguage === "en" ? "ar" : "en";
      state.isRTL = state.currentLanguage === "ar";
    },
    // New action to initialize from current locale
    initializeFromLocale: (state, action: PayloadAction<string>) => {
      const newState = getInitialStateFromLocale(action.payload);
      state.currentLanguage = newState.currentLanguage;
      state.isRTL = newState.isRTL;
    },
  },
});

export const { setLanguage, toggleLanguage, initializeFromLocale } = languageSlice.actions;
export default languageSlice.reducer;
