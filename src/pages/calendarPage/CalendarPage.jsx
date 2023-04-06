import { useContext } from "react";
import classNames from "classnames";
import Menu from './calendar/Menu'
export default function CalendarPage({calendar})
{

const monthsNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj',  'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', ' Grudzień' ];
const thisYear = new Date().getFullYear();


const mobileClassNames = classNames('');
const desktopClassNames = classNames('');
const {name} = calendar;

    console.log(calendar.name);
    return(
    <div className="w-full h-full flex  ">
        <Menu calendarName={name}/>
        {/* calendarDiv */}

        
    </div>);
}



//renders name and "calandars look -> sends request for data"

//date -> all the stuff

// takes data -> sorts 


