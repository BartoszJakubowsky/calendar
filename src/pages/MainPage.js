
// ******************************
//MainPage == use is verified 
//user gets current list of carts along with app download

//need to import menu 
//need to import carts -> 


import CalendarCard from "../components/CalendarCard";
import AdminCalendarCard from "../components/AdminCalendarCart";

import useCarts from '../hooks/useCarts';
import useAuthenctication from "../hooks/useAuthentication";
function MainPage({className}) 
{
    
    const {calendars} = useCarts();
    const {isAdmin} = useAuthenctication();

    const handleCartClick = event =>
    {
        console.log(event.target);
    }
    const handleCreateCartClick = event =>
    {

    }

    //to add -> link to each cart
    const cartAsButton = calendars.map(calendar => 
        {
            return  <CalendarCard 
                    key = {calendar.order}
                    calendar={calendar} 
                    onClick={handleCartClick}>
                    {/* here's link */}
                    <div>{calendar.name}</div>
                    {isAdmin && <AdminCalendarCard toggleIndex={calendar.order}/>}
                    </CalendarCard>
               
                
        })



    return <div className="flex flex-col justify-center items-center h-screen overflow-hidden" >
                    {cartAsButton}
                    {/* Always show additional cart */}
                    <CalendarCard
                        key={'add-cart'}
                        calendar = {{order: 'last'}}
                        onClick = {handleCreateCartClick}
                        >{"Dodaj nowy wózek"}
                    </CalendarCard>
            </div>
}

export default MainPage;