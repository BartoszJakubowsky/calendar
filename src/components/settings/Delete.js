
import Convirm from "../Convirm";
import useCalendars from "../../hooks/useCalendars";
import { useState } from "react";
export default function Delete({calendar, children, message, submit, ...rest}) 
{


    const {convirm, setConvirm} = useCalendars();



    const deleteCaledar = response =>
    {

        if (!response)
        {
            console.log("anulowano usunięcie");
            return;
        }
        
        
        console.log('Remember to add delete func -> id, axios, node response ...')
    }
    
    
    const handleClick = event =>
    {
        event.stopPropagation();
        setConvirm(<Convirm message={message} additional={rest.additional} submit={submit} handleSubmit={deleteCaledar}/>)
    }



    return <div>
            <button className={rest.className} onClick={handleClick}>{children}</button>
        </div>
}