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

import useRefreshToken from '../hooks/useRefreshToken';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from '../axios/axios';

const SurveyForm = () => {

  const refresh = useRefreshToken();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    nationality:'',
    phone_number:'',
    address:'',
    message:''


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
        const res =  await axiosInstance.post('/survey/add-data',formData);
        console.log('surveyResponse',res);
        clearInput();
        toast.success(res.data.message);
    } catch (error) {
        toast.error("Something Went Wrong");
        
    }
  };

  const clearInput = () => {
    setFormData({
        name: "",
        email: "",
        gender: '',
        nationality:'',
        phone_number:'',
        address:'',
        message:''
    })
}
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 3, textAlign: 'center' }}>
        <Typography variant="h4">Survey Form</Typography>
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
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <OutlinedInput
              id="gender"
              name="gender"
              type="text"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel htmlFor="nationality">Nationality</InputLabel>
            <OutlinedInput
              id="nationality"
              name="nationality"
              type="text"
              value={formData.nationality}
              onChange={handleChange}
              label="Nationality"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
            <OutlinedInput
              id="phone_number"
              name="phone_number"
              type="text"
              value={formData.phone_number}
              onChange={handleChange}
              label="Phone Number"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel htmlFor="adress">Address</InputLabel>
            <OutlinedInput
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              label="Address"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel htmlFor="message">Message</InputLabel>
            <OutlinedInput
              id="message"
              name="message"
              type="text"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              label="Message"
            />
          </FormControl>
          <Button type="submit" variant="contained" onClick={handleSubmit} disabled={
                        formData.name === "" ||
                        formData.email === "" ||
                        formData.phone_number === "" ||
                        formData.gender === ""||
                        formData.nationality === ""||
                        formData.address === ""||
                        formData.message === ""

                    }
                         color="primary" fullWidth sx={{ my: 2 }} >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SurveyForm;



