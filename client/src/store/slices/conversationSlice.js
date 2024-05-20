import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../config/axios";

const initialState = {
  data: [],
  isLoading: false,
}

export const fetchConversation = createAsyncThunk(
  'conversation/fetchConversation',
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
    builder.addCase(fetchConversation.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchConversation.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchConversation.rejected, (state, action) => {
      state.isLoading = false;
    })
  }
})


export default conversationSlice.reducer