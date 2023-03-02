import { useState } from 'react'
import {BiEditAlt as CalendarCartIcon} from 'react-icons/bi'

export default function AdminCalendarCard({toggleIndex})
{


    const [isToggled, setToggled] = useState(false);
    const handleMouseEnter = () => setToggled(true);
    const handleMouseLeave = () => setToggled(false);

    const settings = 
    <div onMouseLeave={handleMouseLeave} 
    className={` flex flex-col justify-center items-center absolute h-full w-full top-0 right-0 text-lg bg-lime-100`}>
        <div className=' bg-transparent'>Ustawienia</div>
        <div className=' bg-transparent'>Usuń</div>
    </div>

    return  (isToggled && settings) || <CalendarCartIcon className='absolute top-0 right-0' onMouseEnter={handleMouseEnter}/>
}