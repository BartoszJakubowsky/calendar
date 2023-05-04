
import { NavLink } from "react-router-dom";
import useCalendars from "../../../../hooks/useCalendars";

export default function DesktopMenu({isOpen, close}) 
{
    const {calendars} = useCalendars();
    const handleClick = ( ) => close();

    return (
    <nav className={`top-0 left-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white absolute z-20 h-full  ease-in-out duration-300 ${
    isOpen ? "translate-x-0 " : "-translate-x-full"
    }`} >
        <h3 className="mt-20 text-4xl font-semibold text-white">Do dokończenia</h3>
        <ul>
            <li onClick={handleClick} ><NavLink to='/' style={({isActive}) => {return {color: 'red'}}}>Strona główna</NavLink></li>
            {calendars.map(calendar => {return <li><NavLink to={`/${calendar.name.replaceAll(' ', '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>{calendar.name}</NavLink></li>})}
        </ul>
        <h3 className="mt-20 text-4xl font-semibold text-white">Pozostałe</h3>
        <ul>
            <li onClick={handleClick}><NavLink to='/logowanie'>Wyologuj się</NavLink></li>
        </ul>


    </nav>
)
}