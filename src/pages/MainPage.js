
// ******************************
//MainPage == use is verified 
//user gets current list of carts along with app download

//need to import menu 
//need to import carts -> 

import { useState } from "react";
import CalendarCard from "../components/CalendarCard";
import AdminCalendarCard from "../components/AdminCalendarCart";
import Route from "../components/Route";
import useCalendars from '../hooks/useCalendars';
import useAuthenctication from "../hooks/useAuthentication";
import Convirm from "../components/Convirm";
import {motion as m} from 'framer-motion';
import Menu from "../components/Menu";

function MainPage({className}) 
{
    const {calendars,navigate, convirm, setCalendarToEdit, currentPath} = useCalendars();
    const {isAdmin} = useAuthenctication();


    const navigation = (calendarName) => 
    {   
        navigate('/' + calendarName.replaceAll(' ', '_').normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    }

    const handleCalendarCreate = calendarName => 
    {
        setCalendarToEdit(false);
        navigation(calendarName);
    }

  
    //to add -> link to each cart
    const createCalendarCard = calendars.map((calendar, index) => 
        {
            if (calendar.name === '')
            {
                return <CalendarCard
                key={index}
                calendar={calendar}
                className='pointer-events-none animate-pulse'
                >
                    {<div className="w-3/4 h-4 empty:bg-slate-300 animate-pulse rounded"></div>}
                </CalendarCard>
            }
            

            return  <CalendarCard 
                    key = {index}
                    calendar={calendar} 
                    onClick={()=>navigation(calendar.name)}
                    >
                    {/* here's link */}
                    <div>{calendar.name}</div>
                    {isAdmin && <AdminCalendarCard toggleIndex={index} calendar={calendar} navigation={navigation} />}
                    </CalendarCard>
               
                
        })

    // return <m.div className=" flex flex-col justify-center items-center h-screen overflow-hidden"layout initial={{y: '100%'}} animate={{y: "0%"}} transition={{duration:0.5, ease: 'easeOut', type: 'spring', stiffness: 700, damping: 30}} exit={{opacity:1}} layoutId="1">
    return <m.div className=" flex flex-col justify-center items-center h-screen overflow-hidden"layout initial={{y: '100%'}} animate={{y: "0%"}} transition={{type: 'spring', stiffness: 110, damping: 12}} exit={currentPath === '/logowanie'?{ opacity: 0, transition: 0.2} : {y: "100%"}} layoutId="1">
                    {createCalendarCard}
                    {/* Always show additional cart */}

                    <CalendarCard
                        key={'logowanie'}
                        calendar = {''}
                        onClick = {()=>handleCalendarCreate('logowanie')}
                        >{"Logowanie"}
                    </CalendarCard>


                    {isAdmin && <CalendarCard
                        key={'add-cart'}
                        calendar = {{order: 'last'}}
                        onClick = {()=>handleCalendarCreate('ustawienia')}
                        >{"Dodaj nowy wózek"}
                    </CalendarCard>}
                    {convirm}
            </m.div>
}

export default MainPage;