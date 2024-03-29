
import Confirm from "../ui/Confirm";
import useCalendars from "../../hooks/useCalendars";
import { useState } from "react";
export default function Delete({calendar, children, message, submit, ...rest}) 
{


    const {setConfirm, deleteCalendar} = useCalendars();


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
        setConfirm(<Confirm message={message} additional={rest.additional} submit={submit} handleSubmit={handleDeleteCalendar}/>)
    }



    return <div>
            <button className={rest.className} onClick={handleClick}>{children}</button>
        </div>
}