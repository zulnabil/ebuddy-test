"use client"

import React from "react"
import { Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "@store/userSlice"
import { RootState } from "@store/reducers"
import { instance } from "@apis/userApi"

const UpdateButton: React.FC = () => {
  const dispatch = useDispatch()
  const { loading, error, data } = useSelector((state: RootState) => state.user)

  const handleClick = async () => {
    dispatch(updateUserStart())
    try {
      const token = localStorage.getItem("token") // Retrieve the token from local storage
      const response = await instance.put("/update-user-data", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: { id: "userId", data: { name: "New Name" } },
      })

      if (!response.data) {
        throw new Error("Unauthorized")
      }

      const result = response.data
      dispatch(updateUserSuccess(result))
    } catch (error: any) {
      dispatch(updateUserFailure(error?.message))
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={loading}
      >
        Update User Data
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {data && <Typography>Data Updated: {JSON.stringify(data)}</Typography>}
    </div>
  )
}

export default UpdateButton
