import { useState , useMemo, useEffect} from "react";
import {motion as m} from 'framer-motion';
import { useParams } from "react-router-dom";

import useCalendars from '../../hooks/useCalendars';
import useSlots from "../../hooks/useSlots";

import Menu from '../../components/menu/Menu'
import Confirm from '../../components/ui/Confirm';
import MonthNavbar from "./MonthNavbar";
import MonthCarosuel from "./MonthCarosuel";
import LoadingPage from '../Loading/LoadingPage';
import Message from "../../components/ui/Message";

export default function CalendarPage({})
{
const {calendars, navigate, confirm, isFetching, message} = useCalendars();
const {calendarName} = useParams();
//all nasty code below is written in case of refresh page while rendering calendar page
//code will check if data is still fetching and wait for it till the end

const confirmCalendar = useMemo(()=>
{
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
}, [isFetching])

const [calendar, setCalendar] = useState(confirmCalendar);

useEffect(()=>
{ 
  setTimeout(() => {

    if (!confirmCalendar && !isFetching)
      navigate('/brak_strony');

      setCalendar(confirmCalendar);
  }, 1000);
  
}, [isFetching])

const [displayedMonth, setDisplayedMonth] = useState(0); 
const {slotsArray ,removeAllSlots} = useSlots();

useEffect(()=>
{
    return () =>
    {
      if (slotsArray.length !== 0)
        removeAllSlots();
    }
}, [])

if (!calendar)
  return <LoadingPage/>

  const {name, date} = calendar;

  const variantsForCalendarPage = 
  {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
      // exit: { opacity: 0, x: -200, y: 0 },
        exit: { opacity: 0 },
  }
 
  const monthsCountForMonthCarousel = date.length;
    return(
      <>
        <m.div 
          className=" w-screen h-screen flex items-center flex-col bg-red-100" 
          variants={variantsForCalendarPage} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
          <Confirm message={confirm.message} submit={confirm.submit} handleSubmit={confirm.handleSubmit}/>
          <Message message={message} theme='bg-yellow-100'/>
          <Menu calendarName={name} theme='bg-red-300'/>
            <div className={`mt-4 w-[95%] h-[90%] md:mt-6 md:max-w-[90%] md:[90%] bg-red-300 md:mx-auto rounded-sm text-xs  border-2 border-black overflow-hidden`}>
              <MonthNavbar displayedMonth={displayedMonth} setDisplayedMonth={setDisplayedMonth} monthsCountForMonthCarousel={monthsCountForMonthCarousel}/>      
              <MonthCarosuel calendar={calendar} monthsCountForMonthCarousel={monthsCountForMonthCarousel} displayedMonth={displayedMonth}/>
            </div>
        </m.div>
        </>
      );
}


