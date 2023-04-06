import classNames from "classnames";
import HamburgerIcon from "./menuComponents/HamburgerIcon";

export default function Menu({calendarName,...rest}) 
{
    //remeber to fix calenbdarName to center
    const menuClassName = classNames(rest.className)

  return (
    <div className='bg-red-400 flex items-center w-full'>
        <HamburgerIcon className='scale-75'/>        
        {calendarName? <h1 className="cursor-default justify-self-center">{calendarName}</h1> : false}
    </div>
       );

}