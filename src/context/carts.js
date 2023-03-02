import { createContext, useState, useEffect} from "react";
import useAuthenctication from '../hooks/useAuthentication';
import axios from "axios";


const CartsContext = createContext();

function CartsProvider({children})
{


    const [login, setLogin] = useState(useAuthenctication());
    const [currentPath, setCurrentPath] = useState((login && '/') || 'login' );
    const [calendars, setCalendars] = useState(axios.get('http://localhost:3001/calendars'));

   console.log(calendars);



useEffect(()=>
{
    //set same pathname as 
    window.history.replaceState(null, null, currentPath);

    //handler == navigation forward and back withot refresh when pushState was used
   const handler = () => setCurrentPath(window.location.pathname);
   window.addEventListener('popstate', handler);


    return ()=>
    {
        window.removeEventListener('popstate', handler);
    }
    
}, []);


const navigate = to => 
{
    window.history.pushState({}, '', to);
    setCurrentPath(to);
}


//To change -> given with started app
const cartsNames = 
[
    {name: 'Wózek Miłostowo', order: 1},
    {name: 'Wózek Fontanna', order: 2},
    {name: 'Wózek Jeszcze Jakiś', order: 3}
]



const toProvide = 
{
    navigate, currentPath, login, setLogin, cartsNames
}


    return (
            <CartsContext.Provider value={toProvide}>
                {children}
            </CartsContext.Provider>
            );
}


export {CartsProvider};
export default CartsContext;
