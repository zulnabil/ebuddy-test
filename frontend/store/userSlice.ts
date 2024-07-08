// store/userSlice.ts
import { UserProfile } from "@interface/feature"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  profile: UserProfile | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserProfileStart(state) {
      state.loading = true
      state.error = null
    },
    updateUserProfileSuccess(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload
      state.loading = false
    },
    updateUserProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  updateUserProfileStart,
  updateUserProfileSuccess,
  updateUserProfileFailure,
} = userSlice.actions

export default userSlice.reducer
