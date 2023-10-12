import React from 'react'
import { Grow, Grid } from '@mui/material'


const FormContainer = ({children}) => {
  return (
    <>
      <Grow in>
            <Grid item xs={12} sm={6} md={9}>
                    {children}
            </Grid>
      </Grow>
    </>
  )
}

export default FormContainer