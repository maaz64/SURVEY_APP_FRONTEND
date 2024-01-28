import { useEffect, useState } from "react"
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom"; 
import useAuth from "../hooks/useAuth";



function PersistLogin() {

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();


    useEffect(()=>{

        const verifyToken = async()=>{
            
            try {
                
                await refresh();
                
            } catch (error) {
                
                console.log(error);
            }finally{
                
                setIsLoading(false);
            }
        }
        
        !auth?.token ? verifyToken() : setIsLoading(false);
    },[]);

    useEffect(()=>{
        console.log(`isLoading ${isLoading}`);
        console.log(`token ${JSON.stringify(auth.token)}`);
    },[isLoading])

  return (
    <>
      {
        isLoading ?  <p>Loading...</p> : <Outlet/>
      }
    </>
  )
}

export default PersistLogin
