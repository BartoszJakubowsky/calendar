import { useState } from 'react'
import {BiEditAlt as CalendarCartIcon} from 'react-icons/bi'
import Delete from './settings/Delete';
import useCalendars from '../hooks/useCalendars';

export default function AdminCalendarCard({toggleIndex, calendar, navigation})
{

    const {setCalendarToEdit} = useCalendars();
    const [isToggled, setToggled] = useState(false);
    const handleMouseEnter = () => {setToggled(true)}
    const handleMouseLeave = () => {setToggled(false); };
const handleSettings = (event) =>
    {
        event.stopPropagation();
        setCalendarToEdit(calendar);
        navigation('ustawienia');
        handleMouseLeave();
    }
    // const handleAdminCardClick = (event) => event.stopPropagation();

    const stopPropagation = event => event.stopPropagation();
    const settings = 
    <div onMouseLeave={handleMouseLeave} onClick={stopPropagation}
    className={`flex flex-col justify-center items-center absolute h-full w-full top-0 right-0 text-lg z-10 bg-yellow-200`}>
        <button onClick={handleSettings} className=' bg-transparent '>Ustawienia</button>
        <Delete 
            className='bg-transparent ' 
            message={`Czy na pewno chcesz usunąć ${calendar.name}?`}
            additional={'Operacji nie da się cofnąć'}
            submit={'Usuń kalendarz'}
            calendar={calendar}
            >Usuń</Delete>
    </div>

    return  (isToggled && settings) || <CalendarCartIcon className='absolute top-0 right-0' onMouseEnter={handleMouseEnter}/>
}

