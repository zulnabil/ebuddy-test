// components/Profile.tsx
"use client"

import React, { useState } from "react"
import { Box, Typography, TextField, Button, Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../store/store"
import { updateUserProfile } from "../store/userActions"
import { UserProfile } from "@interface/feature"

interface Props {
  profile: UserProfile
}

const Profile = ({ profile }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.user)
  const [editProfile, setEditProfile] = useState(profile)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditProfile({ ...editProfile, [name]: value })
  }

  const handleSave = async () => {
    await dispatch(updateUserProfile(editProfile))
    setIsEditing(false)
  }

  return (
    <Box
      style={{
        padding: "2rem 1rem",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            value={editProfile.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Display Name"
            name="displayName"
            variant="outlined"
            value={editProfile.displayName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            value={editProfile.phoneNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </Grid>
      </Grid>
      <Box mt={4}>
        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
            fullWidth
          >
            Edit Profile
          </Button>
        )}
        <Button
          variant="contained"
          color="inherit"
          onClick={() => router.push("/login")}
          fullWidth
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  )
}

export default Profile
