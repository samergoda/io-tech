import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  isOpen: boolean; // toggle for search input
}

const initialState: SearchState = {
  query: "",
  isOpen: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    toggleSearch: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setQuery, toggleSearch } = searchSlice.actions;
export default searchSlice.reducer;
