import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal, Box, TextField, Avatar, Container, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const NavBar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleLoginOpen = () => {
    setOpenLogin(true);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const handleRegisterOpen = () => {
    setOpenRegister(true);
  };

  const handleRegisterClose = () => {
    setOpenRegister(false);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" onClick={handleLoginOpen}>
          Login
        </Button>
        <Button color="inherit" onClick={handleRegisterOpen}>
          Register
        </Button>

        <Modal open={openLogin} onClose={handleLoginClose}>
          <Container>
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 3 }}>
                <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" />
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                  Login
                </Button>
              </Box>
            </Box>
          </Container>
        </Modal>

        <Modal open={openRegister} onClose={handleRegisterClose}>
          <Container>
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" onSubmit={handleRegisterSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                  Register
                </Button>
              </Box>
            </Box>
          </Container>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
