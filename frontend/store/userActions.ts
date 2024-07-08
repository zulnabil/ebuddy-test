// store/userActions.ts
import { UserProfile } from "@interface/feature"
import { AppDispatch } from "./store"
import {
  updateUserProfileStart,
  updateUserProfileSuccess,
  updateUserProfileFailure,
} from "./userSlice"
import axios from "axios"

export const updateUserProfile =
  (profile: Partial<UserProfile>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updateUserProfileStart())
      const response = await axios.put("/api/profile", profile)
      dispatch(updateUserProfileSuccess(response.data))
    } catch (error: any) {
      dispatch(updateUserProfileFailure(error.message))
    }
  }
