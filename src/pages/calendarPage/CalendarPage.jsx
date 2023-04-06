import { useContext } from "react";
import classNames from "classnames";

export default function CalendarPage({calendar})
{

const monthsNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj',  'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', ' Grudzień' ];
const thisYear = new Date().getFullYear();


const mobileClassNames = classNames('');
const desktopClassNames = classNames('');



    console.log(calendar.name);
    return(
    <div>
        {/* menu */}
        <h1>{calendar.name}</h1>
        
    </div>);
}



//renders name and "calandars look -> sends request for data"

//date -> all the stuff

// takes data -> sorts 


