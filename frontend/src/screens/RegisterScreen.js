import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Box, Typography, TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const RegisterScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {userInfo} = useSelector((state)=>state.auth)
    const [register, { isLoading }] = useRegisterMutation()

    useEffect(()=>{
      if(userInfo){
        navigate('/');
      }
    }, [navigate, userInfo])

    const handleRegister = async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
          toast.error("Passwords do not match")
        }else{
          try {
            const res = await register({name, email, password}).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate("/");
          } catch (err) {
            toast.error(err?.data?.message || err.error)
          }
        }
    }

    

  return (
    <>
    <FormContainer>
    <Box>
        <Typography variant='h5' textAlign="center" mb="1rem">Sign Up</Typography>
        <form onSubmit={handleRegister}>
          <Box display="grid" gap="1rem">
              <TextField value={name} onChange={(e)=>setName(e.target.value)} sx={{width: "18rem", margin: "auto"}} name="Name" label="Name" type="text" size='small'/>
              <TextField value={email} onChange={(e)=>setEmail(e.target.value)} sx={{width: "18rem", margin: "auto"}} name="email" label="Email Address" type="email" size='small'/>
              <TextField value={password} onChange={(e)=>setPassword(e.target.value)} sx={{width: "18rem", margin: "auto"}} name="password" label="Password" type="password" size='small' />
              <TextField value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} sx={{width: "18rem", margin: "auto"}} name="Confirm Password" label="Confirm Password" type="password" size='small' />
              {isLoading && <Loader/>}
              <Button type="submit" sx={{width: "18rem", margin: "auto"}} variant='contained' color="primary">
                Signup
              </Button>
              <Typography sx={{width: "18rem", margin: "auto", textAlign: "center"}}>
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
          </Box>
        </form>
        </Box>
    </FormContainer>
    </>
  )
}

export default RegisterScreen