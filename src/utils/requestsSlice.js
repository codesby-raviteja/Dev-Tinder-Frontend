import { createSlice } from "@reduxjs/toolkit"

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests(state, action) {
      return action.payload
    },
    removeRequest(state, action) {
      const reqIndex = state.findIndex(
        (req) => req.fromUserId._id === action.payload
      )
      state.splice(reqIndex, 1)
    },
  },
})

export const { addRequests, removeRequest } = requestsSlice.actions

export default requestsSlice.reducer
