
// ******************************
//MainPage == use is verified 
//user gets current list of carts along with app download

//need to import menu 
//need to import carts -> 


import CalendarCard from "../components/CalendarCard";
import AdminCalendarCard from "../components/AdminCalendarCart";
import Route from "../components/Route";

import useCalendars from '../hooks/useCalendars';
import useAuthenctication from "../hooks/useAuthentication";
import Convirm from "../components/Convirm";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";


function MainPage({className}) 
{
    const {calendarNames, convirm, navigate} = useCalendars();
    const {isAdmin} = useAuthenctication();

    const handleCartClick = calendarName => navigate(calendarName);

    const handleCreateCartClick = event =>
    {

    }

    //to add -> link to each cart
    const createCalendarCard = calendarNames.map(calendar => 
        {
            return  <CalendarCard 
                    key = {calendar.order}
                    calendar={calendar} 
                    onClick={()=>handleCartClick(calendar.name)}>
                    {/* here's link */}
                    <div>{calendar.name}</div>
                    {isAdmin && <AdminCalendarCard toggleIndex={calendar.order} calendarName={calendar.name}/>}
                    </CalendarCard>
               
                
        })

    return <div className="flex flex-col justify-center items-center h-screen overflow-hidden" >
                    {createCalendarCard}
                    {/* Always show additional cart */}
                    {isAdmin && <CalendarCard
                        key={'add-cart'}
                        calendar = {{order: 'last'}}
                        onClick = {()=>handleCartClick('stwórz_wózek')}
                        >{"Dodaj nowy wózek"}
                    </CalendarCard>}
                    {convirm}
            </div>
}

export default MainPage;