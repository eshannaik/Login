import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Backend from '../axios';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { LOGIN_SUCCESS } from '../actions/types';
import { loggedin,loggedin_failed } from '../actions/authActions';

const theme = createTheme();

export default function SignIn({setUname,setLoginUser}) {
    const [Username,setUsername] = React.useState('')
    const [Password,setPassword] = React.useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = ({Username,Password})
        let exist = false;
        let mesg = '';
        
        await Backend.post('signin', user)
          .then(function(response) {
            alert(response.data.msg)
            setLoginUser(response.data.res)
            setUname(response.data.name)
            setUsername("")
            setPassword("")
            exist = response.data.res
            mesg = response.data.msg
          })
          .catch(function(err) {
            console.log(err)
          })

          if(exist === true){
            const path = "/home"
            navigate(path)

            dispatch(loggedin({
              Username : Username,
              password : Password,
              msg : mesg,
            }))
          }
          else{
            dispatch(loggedin_failed({
              msg : mesg,
            }))
          }

        
    };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar style ={{marginTop:125}}sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={Username}
                onChange = {(e)=> setUsername(e.target.value)}
                type="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={Password}
                onChange = {(e)=> setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}