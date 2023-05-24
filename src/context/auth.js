import { createContext, useMemo, useState } from 'react';
import axios from 'axios'
import { useNavigate }  from 'react-router-dom';
import jwt_decode from 'jwt-decode';
const AuthContext = createContext();


    function AuthProvider({children}) 
    {
        const navigate = useNavigate();


        const [isAuthenticated, setAuthenticate] = useState(null);
        const [user, setUser] = useState(false);



        axios.interceptors.request.use(
            config => {
              const token = localStorage.getItem('token');
              if (token) {
                // config.headers['x-access-token'] = 'Bearer ' + token;
                config.headers['x-access-token'] = token;
                // config.headers['Authorization'] = 'Bearer ' + token
              }
              return config
            },
            error => {
              Promise.reject(error)
            }
          )
          axios.interceptors.response.use(
            response => {
              return response
            },
          function (error) {
              if (error.response.status === 401) 
              {
                console.log(error);
                // localStorage.removeItem('token');
                setAuthenticate(false);
                return Promise.reject(error)
              }
              return Promise.reject(error)
            }
          )
        
        //token getter, user setter
        useMemo(()=>
        {
          const getToken = () => 
          {
            const token = localStorage.getItem('token');
            if (!token)
              return false;

            return jwt_decode(token);
          }
          const token = getToken();
          console.log(token);
          if (token)
            setUser(token.user);

        }, [isAuthenticated])

        const isAdmin = user? user.isAdmin : false;

        const toProvide = 
        {isAdmin, isAuthenticated, setAuthenticate, user};

        return (
            <AuthContext.Provider value={toProvide}>
                {children}
            </AuthContext.Provider>
            );
    }

    export {AuthProvider};
    export default AuthContext;


        