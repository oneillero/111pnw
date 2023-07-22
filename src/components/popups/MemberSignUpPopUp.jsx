import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import useUserContext from '../../hooks/useUserContext';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { ref } from 'yup';
import { Button, TextField, Box, createTheme, ThemeProvider, OutlinedInput } from '@mui/material';
import { signUpWithEmailAndPassword, signInWithEmailAndPassword } from '../../services/authService';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const MemberSignUpPopUp = ({ handleClose }) => {
  const elements = useElements();
  const stripe = useStripe();
  const { setLoggedInUser } = useUserContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [otherAccount, setOtherAccount] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Enter a valid email address').required('Email is required'),
    password: yup.string().min(8, 'Password should be at least 8 characters long').required('Password is required'),
    confirmPassword: yup.string().required('Please confirm your password').oneOf([yup.ref('password')], 'Passwords do not match'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const userCredential = await signUpWithEmailAndPassword(values.email, values.password);

        const res = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
          billing_details: {
            email: values.email,
            name: values.name,
          },
        });

        const response = await fetch('/api/members', {
          method: 'POST',
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            stripePaymentMethodId: res.paymentMethod.id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        setLoggedInUser(data);
        formik.resetForm();
        handleClose();
        // Redirect to MemberDash
        navigate('/memberDash');
        toast.success('Successful member sign up');
      } catch (error) {
        setErrors({ email: error.message });
      }
    },
  });

  useEffect(() => {
    const { name, email, password, confirmPassword } = formik.values;
    if (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formik.values]);

  const handleClosePopUp = () => {
    handleClose();
    setOtherAccount(false);
  };

  const handleClickYes = () => {
    setOtherAccount((prev) => !prev);
  };

  const cancelButtonStyles = {
    backgroundColor: '#495057',
  };

  const registerButtonStyles = {
    backgroundColor: '#333c2e',
    color: 'white',
  };

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& $notchedOutline': {
              borderColor: '#292b27',
            },
            '&:hover $notchedOutline': {
              borderColor: '#292b27',
            },
            '&$focused $notchedOutline': {
              borderColor: '#292b27',
            },
          },
        },
      },
    },
  });

  const cardElementStyles = {
    root: {
      '& .MuiOutlinedInput-input': {
        padding: '10px',
        fontSize: '16px',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#292b27',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#292b27',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#292b27',
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="popup-box" style={{ zIndex: 9999 }}>
        <div className="box">
          {otherAccount ? (
            <div className="card">
              <div className="card-body">
                <p>Add another account</p>
                <Box m={2} className="custom-btn-group">
                  <Button variant="contained" style={cancelButtonStyles} type="submit" onClick={handleClosePopUp}>
                    No
                  </Button>

                  <Button variant="contained" type="submit" onClick={handleClickYes} style={registerButtonStyles}>
                    Yes
                  </Button>
                </Box>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Member Sign Up</h5>
                <hr />
                <div>
                  <form onSubmit={formik.handleSubmit}>
                    <Box m={2}>
                      <TextField
                        className="text-box custom-input-box"
                        id="name"
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Box>

                    <Box m={2}>
                      <TextField
                        className="text-box custom-input-box"
                        id="email"
                        name="email"
                        label="Email Address"
                        variant="outlined"
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
                        variant="outlined"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                      />
                    </Box>

                    <Box m={2}>
                      <TextField
                        className="text-box custom-input-box"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                      />
                    </Box>

                    <Box m={2}>
                      <OutlinedInput
                        className="text-box custom-input-box"
                        inputProps={{
                          className: 'card-element',
                        }}
                        label="Card Information"
                        variant="outlined"
                        notched
                        inputComponent={CardElement}
                        style={cardElementStyles}
                      />
                    </Box>

                    <Box m={2} className="custom-btn-group">
                      <Button
                        variant="contained"
                        style={cancelButtonStyles}
                        type="submit"
                        onClick={handleClosePopUp}
                      >
                        Cancel
                      </Button>

                      <Button variant="contained" type="submit" disabled={isDisabled} style={registerButtonStyles}>
                        Register
                      </Button>
                    </Box>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MemberSignUpPopUp;
