import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";


export default function Profile() {

    const [survey, setSurvey] = useState([]);
    const token = JSON.parse(localStorage.getItem('token'));
    

    useEffect(()=>{
        const getAllSurveys = async()=>{

                if(token){
                    const res = await axiosInstance.get('/survey/get-all-data', {
                        headers: {
                          Authorization: 'Bearer ' + token,
                        }
                    })
                    console.log(res)
                    setSurvey(res.data.data.surveys);
                }
                
        }
        getAllSurveys();

    },[token])

  return (
    <div>
      <h1>This is Profile</h1>
      <h2>Total Survey : {survey.length}</h2>

    </div>
  )
}
