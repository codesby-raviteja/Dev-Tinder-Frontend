import { createSlice } from "@reduxjs/toolkit"

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload
    },
    removeUserFromFeed(state, action) {
      const reqIndex = state.findIndex((req) => req._id === action.payload)
      state.splice(reqIndex, 1)
    },
  },
})

export const { addFeed, removeUserFromFeed } = feedSlice.actions

export default feedSlice.reducer
