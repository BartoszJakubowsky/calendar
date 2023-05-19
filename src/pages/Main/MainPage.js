
import {motion as m} from 'framer-motion';
import useCalendars from '../../hooks/useCalendars';
import useAuthenctication from "../../hooks/useAuthentication";

import CalendarCard from "./CalendarCard";
import AdminCalendarCard from "./AdminCalendarCart";
import Menu from "../../components/menu/Menu";

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
                    onClick={()=>navigation(`kalendarz/${calendar.name}`)}
                    >
                    {/* here's link */}
                    <div>{calendar.name}</div>
                    {isAdmin && <AdminCalendarCard toggleIndex={index} calendar={calendar} navigation={navigation} />}
                    </CalendarCard>
               
                
        })

    return <div className="h-screen ">
            <Menu className='flex'/>
            <m.div 
                className={'flex flex-wrap justify-center mt-[40%] md:mt-[20%]'} 
                layout initial={{y: '100%'}} animate={{y: "0%"}} transition={{type: 'spring', stiffness: 110, damping: 12}} exit={currentPath === '/logowanie'?{ opacity: 0, transition: 0.2} : {opacity: 0, x: 0, y: -100, transition: 0.2}}>
                    
                    {createCalendarCard}

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
            </div>
}

export default MainPage;