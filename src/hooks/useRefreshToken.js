import useAuth from "./useAuth"
import axiosInstance  from '../axios/axios';


function useRefreshToken() {

    const {setAuth} = useAuth();
  
    const refresh = async()=>{
        const res =  await axiosInstance.post('/refresh-token');
        console.log("response in useRefreshToken", res);
        console.log("response data in useRefreshToken", res.data);
        setAuth((prev)=>{

            return{...prev,
                token: res.data.data.accessToken}
        })

        return res.data.data.acessToken;
    }

    return refresh;

}

export default useRefreshToken
