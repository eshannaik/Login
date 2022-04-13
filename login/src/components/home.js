import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useDispatch} from 'react-redux';
import {loggedout} from '../actions/authActions'

export default function Home(props) {
    const dispatch = useDispatch()
    
    const handleSubmit = () => {
        localStorage.clear();
        window.location.href = '/';

        dispatch(loggedout())
    };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        justifyContent: "center",
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <div><h1><center> HELLO {props.name} </center></h1> </div>
          <div onClick = {handleSubmit}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Logout
              </Button>
          </div>
      </Box>
    </Box>
  );
}