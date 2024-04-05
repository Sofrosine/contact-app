import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ContactState {
  contacts: Contact[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: ContactState = {
  contacts: [],
  loading: true,
};

export const contactSlice = createSlice({
  name: "contact",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setContacts, setLoading } = contactSlice.actions;

export default contactSlice.reducer;
