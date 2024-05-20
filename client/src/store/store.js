import { configureStore } from "@reduxjs/toolkit"
import conversationSlice from "./slices/conversationSlice"

const store = configureStore({
  reducer: {
    conversation: conversationSlice,
  }
})

export default store