
import Convirm from "../Convirm";
import useCalendars from "../../hooks/useCalendars";
import { useState } from "react";
export default function Delete({calendar, children, message, submit, ...rest}) 
{


    const {convirm, setConvirm, deleteCalendar} = useCalendars();



    const handleDeleteCalendar = response =>
    {
        //stop
        if (!response)
            return;
        else
        deleteCalendar(calendar);
    }
    
    
    const handleClick = event =>
    {
        event.stopPropagation();
        setConvirm(<Convirm message={message} additional={rest.additional} submit={submit} handleSubmit={handleDeleteCalendar}/>)
    }



    return <div>
            <button className={rest.className} onClick={handleClick}>{children}</button>
        </div>
}