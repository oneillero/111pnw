import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import * as yup from "yup";
import { Button, TextField, Box } from "@mui/material";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "../../services/authService";

const LoginPopUp = ({ handleClose }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { setLoggedInUser } = useUserContext();
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          values.email,
          values.password
        );
        const email = userCredential.email;

        const response = await fetch('/api/members/login', {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: values.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if the response contains JSON data
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response from the server');
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Something went wrong!');
        }

        const data = await response.json();
        console.log('Login Success:', data);
        setLoggedInUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        formik.resetForm();
        handleClose();
        // Redirect to MemberDash
        navigate('/memberDash');
        toast.success(`Welcome, ${data.member.name}!`);
      } catch (error) {
        console.error('Error during login:', error.message);
        setErrors({ email: 'Invalid email or password' });
      }
    },
  });

  // Listen for formik values changes
  useEffect(() => {
    const { email, password } = formik.values;

    if (email.trim().length > 0 && password.trim().length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formik.values]);

  const cancelButtonStyles = {
    backgroundColor: "#495057",
  };

  const loginButtonStyles = {
    backgroundColor: "#333c2e",
    color: "white",
  };

  return (
    <>
      <div className="popup-box" style={{ zIndex: 9999 }}>
        <div className="box">
          <div className="card">
            <div className="card-body">
              <span className="">Login</span>
              <hr />
              <div>
                <Box m={2}>
                  <TextField
                    className="text-box custom-input-box"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Box>

                <Box m={2}>
                  <TextField
                    className="text-box custom-input-box"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Box>

                <Box m={2} className="custom-btn-group">
                  <Button
                    variant="contained"
                    style={cancelButtonStyles}
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    onClick={formik.handleSubmit}
                    disabled={isDisabled}
                    style={loginButtonStyles}
                  >
                    Login
                  </Button>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPopUp;
