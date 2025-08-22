import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  [key: string]: Record<string, unknown>;
}

const initialState: FormState = {};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<{ formId: string; values: Record<string, unknown> }>) => {
      state[action.payload.formId] = {
        ...state[action.payload.formId],
        ...action.payload.values,
      };
    },
    resetForm: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
