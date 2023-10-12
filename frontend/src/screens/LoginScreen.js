import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Box, Typography, TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from "react-toastify"
import Loader from '../components/Loader'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()
    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
      if(userInfo){
        navigate('/');
      }
    }, [navigate, userInfo])

    const handleLogin = async(e)=>{
        e.preventDefault()
        try {
          const res = await login({email, password}).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate("/");
        } catch (err) {
          toast.error(err?.data?.message || err.error)
        }
    }

  return (
        <FormContainer>
            <Box>
            <Typography variant='h5' textAlign="center" mb="1rem">Login</Typography>
            <form onSubmit={handleLogin}>
              <Box display="grid" gap="1rem">
                  <TextField value={email} onChange={(e)=>setEmail(e.target.value)} sx={{width: "18rem", margin: "auto"}} name="email" label="Email Address" type="email" size='small'/>
                  <TextField value={password} onChange={(e)=>setPassword(e.target.value)} sx={{width: "18rem", margin: "auto"}} name="password" label="Password" type="password" size='small' />
                  {isLoading && <Loader/>}
                  <Button type="submit" sx={{width: "18rem", margin: "auto"}} variant='contained' color="primary">
                     Login
                  </Button>
                    <Typography sx={{width: "18rem", margin: "auto", textAlign: "center"}}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                    </Typography>
              </Box>
            </form>
            </Box>
        </FormContainer>
  )
}

export default Login