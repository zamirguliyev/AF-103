import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/index.js";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const allUsers = await getAllUsers();
      const foundUser = allUsers.find(
        (user) =>
          user.username === values.username && user.password === values.password
      );

      if (foundUser) {
        dispatch(loginUser(foundUser));
        localStorage.setItem("user", JSON.stringify(foundUser.id));
        if (foundUser.isAdmin) {
          navigate("/users");
        } else {
          console.log("Login successful as a regular user");
          navigate("/feed");
        }
      } else {
        console.log("İstifadəçi tapilmadi.");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "İstifadəçi tapilmadi!",
        });
      }
    } catch (error) {
      console.error("Serverdə problem var:", error);
    }
    setSubmitting(false);
  };

  return (
    <Grid container justifyContent="center" style={{ margin: "40px 0" }}>
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <Formik
            initialValues={{ username: "", password: "" }}
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
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <ErrorMessage name="password" component="div" />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "20px" }}
                >
                  Login
                </Button>
                <p
                  style={{
                    textAlign: "end",
                    fontStyle: "italic",
                    margin: "20px 0",
                  }}
                >
                  You dont have accout? <Link to={"/register"}>Register</Link>
                </p>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
