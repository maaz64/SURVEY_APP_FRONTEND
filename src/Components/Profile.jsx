import { useContext, useEffect, useState } from "react";
// import axiosInstance from "../axios/axios";
// import axios from "axios";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../axios/axios";


export default function Profile() {

  const [survey, setSurvey] = useState([]);
  // const token = JSON.parse(localStorage.getItem('token'));
  const { auth } = useAuth();


  useEffect(() => {
    const getAllSurveys = async () => {


      const res = await axiosInstance.get('/survey/get-all-data', {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        }
      })
      console.log(res)
      setSurvey(res.data.data.surveys);
    }

    getAllSurveys();

  }, [auth])

  return (
    <div>
      <h1>This is Profile</h1>
      <h2>Total Survey : {survey.length}</h2>

    </div>
  )
}
