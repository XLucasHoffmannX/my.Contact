import {useState, useEffect} from 'react';
import axios from 'axios';

const UserAPI = (token)=>{
  const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(()=>{
    if(token){
      const getUser = async ()=>{
        try {
          const res = await axios.get("/api/access/infor", {
            headers: { Authorization: token}
          })

          setUserInfo(res.data);
          setIsLogged(true);
        } catch (err) {
          alert(err)
        }
      }
      getUser();
    }
  }, [token])

  return{
    userInfo : [userInfo, setUserInfo],
    isLogged : [isLogged, setIsLogged]
  }
}

export default UserAPI;
