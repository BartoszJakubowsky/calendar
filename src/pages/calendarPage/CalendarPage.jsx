import { useContext } from "react";
import classNames from "classnames";
import Menu from './calendar/Menu'
import Month from "./calendar/Month";
import useMobileDevice from "../../hooks/useMobileDevice";

export default function CalendarPage({calendar})
{

const {name, date, slots, time} = calendar;
const isMobile = useMobileDevice();

const months = date.map(month=>
    {
        return <Month key={month} name={name} date={month} slots={slots} time={time}/>
    })




    console.log(calendar.name);
    return(
    <div className="w-full h-full">
        <Menu calendarName={name}/>
        {/* month holder */}
        <div className={`${isMobile? 'mt-5 w-full' : ' mt-14 w-3/4'} bg-red-300 h-fit m-auto flex overflow-hidden`}>
        <div className="flex flex-row justify-center items-center">
            <p>Poniedziałek</p>
            <p>Wtorek</p>
            <p>Środa</p>
            <p>Czwartek</p>
            <p>Piątek</p>
            <p>Sobota</p>
            <p>Niedziela</p>
        </div>

            {months}
        </div>

        
    </div>);
}



//renders name and "calandars look -> sends request for data"

//date -> all the stuff

// takes data -> sorts 


