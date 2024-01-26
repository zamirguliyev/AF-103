import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postUser, getAllUsers } from "../api/index.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Minimum 3 characters required"),
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{5,}$/,
        "Password should contain at least 5 characters, one uppercase, one lowercase, and one number"
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const allUsers = await getAllUsers();

      const emailExists = allUsers.some((user) => user.email === values.email);

      const usernameExists = allUsers.some(
        (user) => user.username === values.username
      );

      if (emailExists && usernameExists) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Username and email already exist!",
        });
        return;
      } else if (emailExists) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Email already exists!",
        });
        return;
      } else if (usernameExists) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Username already exists!",
        });
        return;
      }

      if (!values.profilePicture) {
        values.profilePicture =
          "https://static.thenounproject.com/png/363640-200.png";
      }

      await postUser({
        username: values.username,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        bio: values.bio,
        profilePicture: values.profilePicture,
        isPublic,
        stories:[],
        isVerified:false,
        isAdmin:false,
        followers:[],
        followings:[],
        requests:[],
        posts:[]
      });

      console.log("User registered successfully!");
      navigate("/login");
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "User registered successfully!",
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
    setSubmitting(false);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <Formik
            initialValues={{
              username: "",
              fullName: "",
              email: "",
              password: "",
              bio: "",
              profilePicture: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  type="text"
                  name="username"
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <ErrorMessage name="username" component="div" />
                <Field
                  as={TextField}
                  type="text"
                  name="fullName"
                  label="Full Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <ErrorMessage name="fullName" component="div" />
                <Field
                  as={TextField}
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <ErrorMessage name="email" component="div" />
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <ErrorMessage name="password" component="div" />
                <Field
                  as={TextField}
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <ErrorMessage name="confirmPassword" component="div" />
                <Field
                  as={TextField}
                  type="text"
                  name="bio"
                  label="Bio"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  fullWidth
                />
                {/* <ErrorMessage name="bio" component="div" /> */}
                <Field
                  as={TextField}
                  type="text"
                  name="profilePicture"
                  label="Profile Picture URL"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  defaultValue="https://static.thenounproject.com/png/363640-200.png"
                />

                {/* <ErrorMessage name="profilePicture" component="div" /> */}

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Make profile public"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "20px" }}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
