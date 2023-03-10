import { useContext } from "react";
import CalendarsContext from "../context/calendars";

function useCalendars()
{
    return useContext(CalendarsContext);
}

export default useCalendars;



