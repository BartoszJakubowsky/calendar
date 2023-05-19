import { useState , useMemo} from "react";
import {motion as m} from 'framer-motion';
import io from "socket.io-client";
import { useParams } from "react-router-dom";


import useSocket from '../../hooks/useSocket';
import useSlot from "../../hooks/useSlot";
import useCalendars from '../../hooks/useCalendars';

import Menu from '../../components/menu/Menu'
import Month from "./Month";
import Confirm from '../../components/ui/Confirm';
import MonthNavbar from "./MonthNavbar";
import MonthCarosuel from "./MonthCarosuel";



export default function CalendarPage({})
{
const {calendars, navigate, convirm} = useCalendars();
const {calendarName} = useParams();

const confirmCalendar = useMemo(()=>
{
  console.log('to url', calendarName);
  //check if urlName matches calendar name
  const parseStringToUrl = string => string.replaceAll(' ', '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  for (let i = 0; i < calendars.length; i++) 
  {
    const thisCalendar = calendars[i];
    const thisCalendarName = parseStringToUrl(thisCalendar.name);

    if (calendarName === thisCalendarName)
    { 
      return thisCalendar;
    }
  }

  return false;
})
const [calendar, setCalendar] = useState(confirmCalendar);

if (!calendar)
  navigate('/brak_strony');

const [displayedMonth, setDisplayedMonth] = useState(0); 

const {name, date} = calendar;
// const {updateSlot} = useSlot();
// const {setSocket, handleSocket} = useSocket();

  // useEffect(() => {

  //     // const socket = io.connect();
  //     const socket = io.connect("http://localhost:3002");

  //     const emit = socket.emit('message', {test: 'test'});
      
  //     socket.on("connected", (data) => 
  //     {
  //       setSocket(emit)  
  //       console.log(data)
  //     });

  //     socket.on('message', data => 
  //     {

  //       console.log(data);
  //         // updateSlot(data.slot)
  //     })

  //     return () => {
  //       // Zamykanie połączenia socket.io po opuszczeniu komponentu
  //       console.log('Websockets disconnect')
  //       setSocket(false);
  //       socket.disconnect();
  //     };
  // }, []);

  


  const variantsForCalendarPage = 
  {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        // exit: { opacity: 0, x: -200, y: 0 },
        exit: { opacity: 0 },
  }
  
    const monthsCountForMonthCarousel = date.length;
    return(
      <m.div 
        className=" absolute inset-0 flex items-center flex-col bg-red-100" 
        variants={variantsForCalendarPage} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
      <Confirm message={convirm.message} submit={convirm.submit} handleSubmit={convirm.handleSubmit}/>
      <Menu calendarName={name} theme='bg-red-300'/>
      <div className={`mt-4 w-11/12 h-[90%] md:mt-14 md:max-w-[90%] md:h-5/6 bg-red-300 md:mx-auto overflow-x-hidden rounded-sm text-xs overflow-hidden`}>
        <MonthNavbar displayedMonth={displayedMonth} setDisplayedMonth={setDisplayedMonth} monthsCountForMonthCarousel={monthsCountForMonthCarousel}/>      
        <MonthCarosuel calendar={calendar} monthsCountForMonthCarousel={monthsCountForMonthCarousel} displayedMonth={displayedMonth}/>
          </div>
      </m.div>
      );
    
}



//renders name and "calandars look -> sends request for data"

//date -> all the stuff

// takes data -> sorts 


