import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from 'react-router-dom';


export default function Profile() {

  const [survey, setSurvey] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();



  useEffect(() => {

    let isMounted = true;
    const controller = new AbortController();

    const getAllSurveys = async () => {

      try {
        const res = await axiosPrivate.get('/survey/get-all-data');
        console.log(res.data.data.surveys);
        isMounted && setSurvey(res.data.data.surveys);
        setLoading(false);
      } catch (error) {
        navigate('/login')

      }
    }

    getAllSurveys();


    return () => {
      isMounted = false;
      controller.abort();
    }

  }, [])

  return (
    <div className="profile">
      {
        loading ? <h2>Loading...</h2> :
          <>
            <h1>This is Profile</h1>
            <h2>Total Survey : {survey.length}</h2>
            {survey.map(s => {
              return (<>
                <div key={s._id} className="surveys" >
                  <h3>{s.name}</h3>
                  <p>{s.message}</p>
                </div>

              </>)
            })}
          </>
      }
    </div>
  )
}
