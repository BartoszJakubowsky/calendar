import { createContext } from 'react';
import axios from 'axios'
import { useNavigate }  from 'react-router-dom';
const AuthContext = createContext();


    function AuthProvider({children}) 
    {
        const navigate = useNavigate();

        axios.interceptors.request.use(
            config => {
              const token = localStorage.getItem('token');
              if (token) {
                config.headers['Authorization'] = 'Bearer ' + token
              }
              // config.headers['Content-Type'] = 'application/json';
              return config
            },
            error => {
              Promise.reject(error)
            }
          )
          const initial = async () =>
          {
            await axios.get('http://localhost:3002/initial')
            .then(response => 
                {
                    if (!response)
                        navigate('/logowanie')
                })
          }
        


          axios.interceptors.response.use(
            response => {
              return response
            },
            function (error) {
            //   const originalRequest = error.config
                console.log(error)
              if (error.response.status === 401) 
              {
                navigate('/logowanie')
                return Promise.reject(error)
              }
          
            //   if (error.response.status === 401 && !originalRequest._retry) {
            //     originalRequest._retry = true
            //     const refreshToken = localStorageService.getRefreshToken()
            //     return axios
            //       .post('/auth/token', {
            //         refresh_token: refreshToken
            //       })
            //       .then(res => {
            //         if (res.status === 201) {
            //           localStorageService.setToken(res.data)
            //           axios.defaults.headers.common['Authorization'] =
            //             'Bearer ' + localStorageService.getAccessToken()
            //           return axios(originalRequest)
            //         }
            //       })
            //   }
              return Promise.reject(error)
            }
          )










        const isAdmin = true;

        const toProvide = 
        {isAdmin};

        return (
            <AuthContext.Provider value={toProvide}>
                {children}
            </AuthContext.Provider>
            );
    }

    export {AuthProvider};
    export default AuthContext;


        