import classNames from "classnames";
import HamburgerIcon from "../pages/calendarPage/calendar/menuComponents/HamburgerIcon";
import useMobileDevice from '../hooks/useMobileDevice'
import DesktopMenu from "../pages/calendarPage/calendar/menuComponents/DesktopMenu";
import MobileMenu from "../pages/calendarPage/calendar/menuComponents/MobileMenu";
import { useState } from "react";
export default function Menu({calendarName,...rest}) 
{
    //remeber to fix calenbdarName to center
    const menuClassName = classNames(rest.className)
    const isMobile = useMobileDevice();
    const [isOpen, setIsOpen] = useState(false);
    const handleMenuClick = () => setIsOpen(!isOpen); 

  return (
    <div className={rest.className? rest.className : `bg-red-400 flex items-center justify-center w-full h-12`}>
        <HamburgerIcon  onClick={handleMenuClick} className='scale-75 absolute left-0 top-0 z-30' isOpen={isOpen} setIsOpen={setIsOpen} />          
        {calendarName? <h1 className="cursor-default flex font-semibold">{calendarName}</h1> : false}
        {isMobile? <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}/> : <DesktopMenu isOpen={isOpen} setIsOpen={setIsOpen}/>}
    </div>
       );

}