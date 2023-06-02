import { createContext, useMemo, useState } from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();


    function AuthProvider({children}) 
    {

        const [isAuthenticated, setAuthenticate] = useState(null);
        const [user, setUser] = useState(false);
        // axios.defaults.baseURL = 'http://localhost:3002';
        axios.defaults.baseURL = window.location.origin;
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
                localStorage.removeItem('token');
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
              {
                setAuthenticate(false);
                return false;
              }

            return jwt_decode(token);
          }
          const getNewToken = (oldToken) =>
          {
            const currentTime = Math.floor(Date.now() / 1000); 
            const timeLeft = oldToken.exp - currentTime; 

            if (timeLeft > 300) 
              return;

              console.log('newToken set');
              const user = token.user;  
              axios.post('/token', user)
              .then(response => 
                {
                  const token = response.data.token;
                  localStorage.setItem('token', token);
                })
              .catch(err => console.log(err))
              console.log('czas', token);
          }
          const token = getToken();
          if (token)
          {
            getNewToken(token);
            setUser(token.user);
          }

        }, [isAuthenticated])

        // useEffect(()=>
        // {
        //   if (isAuthenticated === false)
        //     // window.location.href = 'http://localhost:3000/logowanie';
        // }, [])

        const isAdmin = user && user.permissions && user.permissions.includes('Admin');

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


        