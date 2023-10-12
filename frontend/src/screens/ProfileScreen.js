import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Box, Typography, TextField, Button } from '@mui/material'
import {toast} from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import Loader from '../components/Loader'

const ProfileScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()

    const {userInfo} = useSelector((state)=>state.auth)
    const [updateProfile, {isLoading}] = useUpdateUserMutation()

    useEffect(()=>{
        setName(userInfo.name);
        setEmail(userInfo.email);
        //react-hooks/exhaustive-deps
    }, [userInfo.setName, userInfo.setEmail]) 

    const handleProfile = async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
          toast.error("Passwords do not match")
        }else{
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success("Profile updated");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    

  return (
    <>
    <FormContainer>
    <Box>
        <Typography variant='h5' textAlign="center" mb="1rem">Update Profile</Typography>
        <form onSubmit={handleProfile}>
          <Box display="grid" gap="1rem">
              <TextField value={name} onChange={(e)=>setName(e.target.value)} sx={{width: "18rem", margin: "auto"}} name="Name" label="Name" type="text" size='small'/>
              <TextField value={email} onChange={(e)=>setEmail(e.target.value)} sx={{width: "18rem", margin: "auto"}} name="email" label="Email Address" type="email" size='small'/>
              <TextField value={password} onChange={(e)=>setPassword(e.target.value)} sx={{width: "18rem", margin: "auto"}} name="password" label="Password" type="password" size='small' />
              <TextField value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} sx={{width: "18rem", margin: "auto"}} name="Confirm Password" label="Confirm Password" type="password" size='small' />
              {isLoading && <Loader/>}
              <Button type="submit" sx={{width: "18rem", margin: "auto"}} variant='contained' color="primary">
                Update
              </Button>

          </Box>
        </form>
        </Box>
    </FormContainer>
    </>
  )
}

export default ProfileScreen