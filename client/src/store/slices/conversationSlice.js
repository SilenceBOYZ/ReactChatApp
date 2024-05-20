import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../config/axios";

const initialState = {
  data: [],
  isLoading: false,
}

export const fetchUserInConversation = createAsyncThunk(
  'conversation/fetchUserInConversation',
  async () => {
    try {
      const response = await instance.get('/api/users');
      const data = response;
      return data
    } catch (error) {
      console.error("Error in conversation slice");
    }
  }
)

const conversationSlice = createSlice({
  name: "conversation",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserInConversation.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchUserInConversation.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchUserInConversation.rejected, (state, action) => {
      state.isLoading = false;
    })
  }
})


export default conversationSlice.reducer