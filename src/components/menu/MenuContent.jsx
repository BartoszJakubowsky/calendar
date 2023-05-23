import { NavLink } from "react-router-dom";
import useCalendars from "../../hooks/useCalendars";
import classNames from "classnames";
import useAuthenctication from "../../hooks/useAuthentication";


export default function MenuContent({handleClick}) 
{
    const {isAdmin} = useAuthenctication();
    const {calendars} = useCalendars();
    const activeClassName = classNames('text-black text-xl font-semibold border-l-2 border-black pl-1');
    const normalClassName = classNames(' text-xl pl-2 text-slate-100 hover:text-white duration-150 ');

    const hClassName = classNames("mt-20 text-4xl font-semibold text-white border-b-4 border-white mb-4 cursor-default");
    return (<div>

        <h3 className={hClassName}>Menu</h3>
        <ul>
            <li onClick={handleClick} ><NavLink to='/' className={(navData) => (navData.isActive ? activeClassName : normalClassName)}>Strona główna</NavLink></li>
            {calendars.map((calendar, index)=> 
                { 
                    if(calendar.name === '' || calendar === undefined) 
                    return false;
                    return <li key={index}>
                            <NavLink 
                                className={(navData) => (navData.isActive ? activeClassName : normalClassName)} 
                                to={`/kalendarz/${calendar.name.replaceAll(' ', '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>{calendar.name}</NavLink></li>})}
        </ul>
        <h3 className={hClassName}>Pozostałe</h3>
        <ul>
            <li onClick={handleClick}><NavLink to='/logowanie' className={(navData) => (navData.isActive ? activeClassName : normalClassName)}>Wyloguj się</NavLink></li>
            {isAdmin? 
            <>
            <li onClick={handleClick}><NavLink to='/ustawienia' className={(navData) => (navData.isActive ? activeClassName : normalClassName)}>Stwórz wózek</NavLink></li>
            <li onClick={handleClick}><NavLink to='/admin' className={(navData) => (navData.isActive ? activeClassName : normalClassName)}>Panel administratora</NavLink></li>
            </>
             : false}
        </ul>
        
        <div className=""></div>
        </div>)
}