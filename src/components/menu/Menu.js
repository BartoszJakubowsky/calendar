import { useState, useEffect } from "react";

import HamburgerIcon from "./HamburgerIcon";
import Slider from "./Slider";
export default function Menu({calendarName, theme, ...rest}) 
{
    const [isOpen, setIsOpen] = useState(false);
    const handleMenuClick = () => setIsOpen(!isOpen); 

    useEffect(() => {
      const handlePopstate = () => {
        setIsOpen(false); 
      };
  
      window.addEventListener("popstate", handlePopstate);
  
      return () => {
        window.removeEventListener("popstate", handlePopstate);
      };
    }, []);



  return (
    <div className={rest.className? rest.className : ` bg-violet-400 text-white flex items-center justify-center w-full h-12`}>
        <HamburgerIcon  onClick={handleMenuClick} className='scale-75 absolute left-0 top-0 z-40' isOpen={isOpen} setIsOpen={setIsOpen} />          
        {calendarName? <h1 className="cursor-default flex font-semibold ">{calendarName}</h1> : false}
        <Slider isOpen={isOpen} setIsOpen={setIsOpen} theme={theme}/>
    </div>
       );

}