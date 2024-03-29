import React, {  useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';


import axiosInstance from '../axios/axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [sucess, setSucess] = useState(false);

  const {auth,setAuth} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/sign-in', formData);
      const accessToken = res?.data?.data?.accessToken;
      const refreshToken = res?.data?.data?.refreshToken;
      const userId = res?.data?.data?.userId;
      const name = res?.data?.data?.name;
      console.log(`accessToken:${accessToken} refreshToken:${refreshToken} userId: ${userId} name:${name}`)
      console.log("res in signin page",res);
      setAuth({ userId, name, refreshToken, accessToken});
      clearInput();
      setSucess(true);
  
      navigate('/profile');
      toast.success(res.data.message)

    } catch (error) {

      if (!error?.response) {
        toast.error('No Server Response');
      }
      else if (error?.response.status === 400) {
        toast.error('Missing Email/password');

      }
      else if (error?.response.status === 401) {
        toast.error('Invalid Email/password');

      }
      else{
        toast.error('Login Failed');

      }

    }
  };

  const clearInput = () => {
    setFormData({
      email: "",
      password: "",
    })
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h4">Login In</Typography>
        <form onSubmit={handleSubmit}>
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

          <Button type="submit" variant="contained" disabled={
            formData.email === "" ||
            formData.password === ""}
            color="primary" fullWidth sx={{ my: 2 }} >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignInPage;
