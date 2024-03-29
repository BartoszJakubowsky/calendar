import { createContext, useState, useEffect, useMemo} from "react";
import useAuthentication from '../hooks/useAuthentication';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Message from '../components/ui/Message';
import { visualElementStore } from "framer-motion";
const CalendarsContext = createContext();

function CalendarsProvider({children, url})
{

    const {isAuthenticated, setAuthenticate} = useAuthentication();

    // const tempCalendar = {name: 'Środa Wielkopolska', date: ['KWIECIEŃ.2023', 'MAJ.2023', 'CZERWIEC.2023', 'LIPIEC.2023'], time: {timeFrom: '08:00', timeTo: '16:00', timeSpace: '01:00'}, slots: [{name: 'Oficjalne', space: 2, order: 1},{name: 'Nieoficjalne', space: 2, order: 2}]}
    const tempCalendar = [{name: ''}, {name: ''}, {name: ''}]
    // const [login, setLogin] = useState(useAuthenctication());
    // const [currentPath, setCurrentPath] = ('/');
    const [calendars, setCalendars] = useState(tempCalendar);
    const [confirm, setConfirm] = useState(false);
    const [calendarToEdit, setCalendarToEdit] = useState(false)
    const [isFetching, setIsFetching] = useState(true);
    const [isFirstRender, setIsFirstRender] = useState(false);
    const [message, setMessage] = useState(false);

    const navigate = useNavigate();
    const currentPath = useLocation().pathname;

    const skipPaths = ['/logowanie', '/haslo', '/rejestracja', '/admin'];
    useMemo(() => {

        if (skipPaths.includes(currentPath) || isAuthenticated === false)
            return;

        const fetchData = async () => {
          try {
            const response = await axios.get('/calendar')
            .then(response => 
                {
                    setCalendars(response.data);
                    setIsFetching(false);
                })

          } catch (error) {
            if (error.response.status !== 401)
                setTimeout(fetchData, 5000);
          }
        };
    
        fetchData();
      }, [currentPath]);

      useEffect(()=>
      {

        if (!isFirstRender)
        {
            setIsFirstRender(true);
            return
        }

        if (!isAuthenticated)
        {   
            setAuthenticate(true);
        }

      }, [isFetching])

      useEffect(()=>
    {
        setTimeout(() => {
          setMessage(false);
        }, 3000);
    }, [message])

    
const calendarNames = calendars.map((calendar, index) =>
    {
        return {name: calendar.name, order: index}
    })
const  createCalendar = async (newCalendar) =>
{   
    // newCalendar._id = uuidv4();
    axios.post('/calendar', newCalendar)
    .then(receivedCalendar => setCalendars([...calendars, receivedCalendar.data]))
    .then()
    .catch(error => console.error(error));
}
const updateCalendar = async (oldCalendar, newCalendar) =>
{
    // fetch(`http://localhost:3001/calendars/${oldCalendar.id}`, {
    //     method: 'PUT',
    //     headers: 
    //     {
    //     'Content-Type': 'application/json'
    // },
    // body: JSON.stringify(newCalendar)
    // })
    // .then(response => response.json())
    newCalendar._id = oldCalendar._id;

    axios.put(`/calendar`, newCalendar)
    .then(respond => setCalendars(calendars.map((calendar, index)=>
    {

        if(calendar._id === newCalendar._id && respond)
        {
            return {...newCalendar};
        }
        return {...calendar}
    })))
    .catch(error => console.error(error));
}

const deleteCalendar = async (calendarToDelete) =>
{
    
    // fetch(`http://localhost:3001/calendars/${calendarToDelete.id}`, {
    //     method: 'DELETE',
    // })
    await axios.delete(`/calendar/${calendarToDelete._id}`)
    .then(response => {
        if(response) {
            setCalendars(calendars.filter(calendar => calendar._id !== calendarToDelete._id));
            return true;
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => 
        {
            console.error(error);
            return false;
        });
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
    currentPath, 
    calendarNames, 
    confirm, 
    setConfirm, 
    calendars, 
    createCalendar,
    handleCalendarCreate, 
    calendarToEdit, 
    setCalendarToEdit,
    deleteCalendar,
    navigate,
    isFetching,
    message, 
    setMessage,
    updateCalendar
}


    return (
            <CalendarsContext.Provider value={toProvide}>
                {children}
            </CalendarsContext.Provider>
            );
}


export {CalendarsProvider};
export default CalendarsContext;
