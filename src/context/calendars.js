import { createContext, useState, useEffect} from "react";
import useAuthenctication from '../hooks/useAuthentication';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


const CalendarsContext = createContext();

function CalendarsProvider({children, url})
{

    // const tempCalendar = {name: 'Środa Wielkopolska', date: ['KWIECIEŃ.2023', 'MAJ.2023', 'CZERWIEC.2023', 'LIPIEC.2023'], time: {timeFrom: '08:00', timeTo: '16:00', timeSpace: '01:00'}, slots: [{name: 'Oficjalne', space: 2, order: 1},{name: 'Nieoficjalne', space: 2, order: 2}]}
    const tempCalendar = [{name: ''}, {name: ''}, {name: ''}]
    const [login, setLogin] = useState(useAuthenctication());
    const [currentPath, setCurrentPath] = useState('/');
    const [calendars, setCalendars] = useState(tempCalendar);
    const [convirm, setConvirm] = useState(false);
    const [calendarToEdit, setCalendarToEdit] = useState(false)
    console.log(currentPath);
useEffect(()=>
{
    fetch('http://localhost:3001/calendars')
              .then(response => response.json())
              .then(data => setCalendars(data))
              .catch(error => console.error(error));

    //set same pathname as 
    window.history.replaceState(null, null, currentPath);

    //handler == navigation forward and back withot refresh when pushState was used
    const handler = () => 
    {
        setConvirm(false);
        setCurrentPath(window.location.pathname);
    }
    window.addEventListener('popstate', handler);
    // getCalendars().then(calendars => setCalendars());

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
const calendarNames = calendars.map((calendar, index) =>
    {
        return {name: calendar.name, order: index}
    })

const  createCalendar = async (newCalendar) =>
{   
    newCalendar.id = uuidv4();
    console.log(newCalendar);
        fetch('http://localhost:3001/calendars', {
        method: 'POST',
        headers: 
        {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCalendar)
    })
    .then(response => response.json())
    .then(receivedCalendar => setCalendars([...calendars, receivedCalendar]))
    .catch(error => console.error(error));
}
const updateCalendar = async (oldCalendar, newCalendar) =>
{
    fetch(`http://localhost:3001/calendars/${oldCalendar.id}`, {
        method: 'PUT',
        headers: 
        {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCalendar)
    })
    .then(response => response.json())
    .then(receivedCalendar => setCalendars(calendars.map((calendar, index)=>
    {
        if(calendar.id === oldCalendar.id)
            return receivedCalendar
        return calendar
    })))
    .catch(error => console.error(error));
}

const deleteCalendar = async (calendarToDelete) =>
{

    fetch(`http://localhost:3001/calendars/${calendarToDelete.id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if(response.ok) {
            setCalendars(calendars.filter(calendar => calendar.id !== calendarToDelete.id));
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => console.error(error));
}
const handleCalendarCreate = async (oldCalendar, newCalendar) =>
{
    if (oldCalendar.name === undefined || oldCalendar.name === '')
        createCalendar(newCalendar);
    else
        updateCalendar(oldCalendar, newCalendar)
}



const toProvide = 
{
    navigate, 
    currentPath, 
    setCurrentPath,
    login, 
    setLogin, 
    calendarNames, 
    convirm, 
    setConvirm, 
    calendars, 
    createCalendar,
    handleCalendarCreate, 
    calendarToEdit, 
    setCalendarToEdit,
    deleteCalendar
}


    return (
            <CalendarsContext.Provider value={toProvide}>
                {children}
            </CalendarsContext.Provider>
            );
}


export {CalendarsProvider};
export default CalendarsContext;
