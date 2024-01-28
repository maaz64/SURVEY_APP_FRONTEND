import { useState } from 'react';
import { 
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

import axiosInstance  from '../axios/axios';


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async(e) => {
      try {
        e.preventDefault();
        const res =  await axiosInstance.post('/sign-up',formData);
        clearInput();
        toast.success("Registration Successfull");

    } catch (error) {
      if (!error?.response) {
        toast.error('No Server Response');
      }
      else if (error?.response.status === 422) {
        toast.error("Password Doesn't Match");

      }
      else if (error?.response.status === 409) {
        toast.error('Email Already Registered');

      }
      else{
        toast.error('Login Failed');

      }
    }
  };

  const clearInput = () => {
    setFormData({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    })
}
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h4">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              label="Name"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm_password"
              name="confirm_password"
              type="password"
              value={formData.confirm_password}
              onChange={handleChange}
              label="Confirm Password"
            />
          </FormControl>
          <Button type="submit" variant="contained" onClick={handleSubmit} disabled={
                        formData.name === "" ||
                        formData.email === "" ||
                        formData.password === "" ||
                        formData.confirm_password === ""}
                         color="primary" fullWidth sx={{ my: 2 }} >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;
