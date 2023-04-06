import { createContext, useState, useEffect} from "react";
import useAuthenctication from '../hooks/useAuthentication';
import axios from "axios";


const CalendarsContext = createContext();

function CalendarsProvider({children})
{

    const tempCalendar = {name: 'Środa Wielkopolska', date: ['KWIECIEŃ.2023', 'MAJ.2023'], time: {timeFrom: '08:00', timeTo: '16:00', timeSpace: '01:00'}, slots: [{name: 'Oficjalne', space: '2', order: 1},{name: 'Nieoficjalne', space: '2', order: '2'}]}
    const [login, setLogin] = useState(useAuthenctication());
    const [currentPath, setCurrentPath] = useState((login && '/') || 'login' );
    const [calendars, setCalendars] = useState([tempCalendar]);
    const [convirm, setConvirm] = useState(false);

useEffect(()=>
{
    //set same pathname as 
    window.history.replaceState(null, null, currentPath);

    //handler == navigation forward and back withot refresh when pushState was used
    const handler = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handler);


    // getCalendars().then(calendars => setCalendars());

    return ()=>
    {
        window.removeEventListener('popstate', handler);
    }
    
}, []);

console.log(calendars);
// async function getCalendars() 
// {
//     return await axios.get('http://localhost:3001/calendars');
// }


const navigate = to => 
{
    window.history.pushState({}, '', to);
    setCurrentPath(to);
}


//To change -> given with started app
const calendarNames = 
[
    {name: 'Środa Wielkopolska', order: 1},
    {name: 'Wózek Fontanna', order: 2},
    {name: 'Wózek Inny', order: 3}
]


const toProvide = 
{
    navigate, currentPath, login, setLogin, calendarNames, convirm, setConvirm, calendars, setCalendars
}


    return (
            <CalendarsContext.Provider value={toProvide}>
                {children}
            </CalendarsContext.Provider>
            );
}


export {CalendarsProvider};
export default CalendarsContext;
