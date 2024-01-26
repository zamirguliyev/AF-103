import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getAllUser, postUser } from "../request.js";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

export default function Register({ setUser,setOpenRegister }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const isAdmin = event.target.isAdmin.checked;

    if (username.length < 3) {
      setMessage("Username must be at least 3 characters long.");
      setOpen(true);
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      setOpen(true);
      return;
    }

    try {
      const users = await getAllUser();
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          setMessage("An account with this email already exists.");
          setOpen(true);
          return;
        }
        if (users[i].username === username) {
          setMessage("An account with this username already exists.");
          setOpen(true);
          return;
        }
      }
      await postUser({ username, email, password, isAdmin });
      setMessage("Registration successful!");
      setOpenRegister(false);

      setUser({ username, email, isAdmin });
      localStorage.setItem('user', JSON.stringify({ username, email, isAdmin }));
    } catch (error) {
      console.error(error);
      setMessage(
        "An error occurred while processing your request. Please try again later."
      );
      setOpen(true);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="isAdmin">Is Admin?</label>
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              {message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
}
