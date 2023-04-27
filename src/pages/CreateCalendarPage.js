import { useState } from "react";
import classNames from "classnames";

import Input from '../components/createCalendarComponents/Input';
import SelectMonths from "../components/createCalendarComponents/SelectMonths";
import AdditionalSettings from "../components/createCalendarComponents/AdditionalSettings";
import useCalendars from '../hooks/useCalendars';

export default function CreateCalendarPage({calendarName, calendarDate, calendarTime, calendarSlots, calendarId}) 
{
    
    const entryCalendar = {name: calendarName, date: calendarDate, time: calendarTime, slots: calendarSlots, id:calendarId};
    const {createCalendar, handleCalendarCreate, navigate} = useCalendars();
    const [name, setName] = useState(calendarName || '');
    const [year, setYear] = useState(calendarDate? parseInt(calendarDate[0].split('.')[1], 10) : new Date().getFullYear());
    const [additional, setAdditional] = useState(false);
    const [slotSettingsCard, setSlotSettingsCard] = useState(false);
    const [timeSettingCard, setTimeSettingsCard] = useState(false);
    const [date, setDate] = useState(calendarDate || []);
    const [isHover, setIsHover] = useState(false);
    const handleAdditional = addSettings => setAdditional(addSettings);
    const handleNameChange = event => setName(event.target.value);
    const handleYear = (year) => setYear(year)
    const handleSendClick = event => 
    {
        event.preventDefault();
        const allSettings = {name, date: date, ...additional};
        //oldCalendar, newCalendar
        handleCalendarCreate(entryCalendar, allSettings);
        navigate('/');
    }
        const handleMouseEnter = () => setIsHover(true);
        const handleMouseLeave = () => 
        {
            if (slotSettingsCard !== false || timeSettingCard !== false)
                return
            else
                setIsHover(false);   
        }
        console.log(date);
        const mainDivClassName = classNames(`absolute left-1/4 w-1/2 h-fit 
                                            flex flex-col justify-start items-center 
                                            border-black border-2 mt-10 
                                            duration-300 ease-in-out`, 
                                            isHover ? 'shadow-[10px_10px_0px_0px_rgb(7_89_133)]' : '')

    return(
        <div className="relative w-screen h-screen bg-pink-400 overflow-hidden">
            <div 
                className={mainDivClassName}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                    >
            <h3 className="text-white uppercase text-xl bold bg-sky-500 text-center 400 w-full p-3 select-none font-bold">
                Stwórz nowy wózek
            </h3>
            <form className=" bg-white w-full h-full flex flex-col [&>*]:mt-2 [&>*]:mx-2 [&>label]:uppercase [&>label]:font-semibold">
                
                <label>Nazwa wózka</label>
                <Input 
                className="box-border h-10 border-2 border-opacity-100 rounded-sm hover:border-gray-400 duration-300 ease-in-out "
                calendarName={name} 
                handleNameChange={handleNameChange}/>

                <label className="">Wybierz miesiąc lub miesiące</label>    
                <SelectMonths
                year={year}
                setDate={setDate}                
                handleYear={handleYear}
                date={date}
                />
                <label className="">Ustawienia dodatkowe</label>
                <AdditionalSettings calendarTime={calendarTime} calendarSlots={calendarSlots} onChange={handleAdditional} slotCard={setSlotSettingsCard} timeCard={setTimeSettingsCard}/>
                <button 
                className="self-center my-2 w-20 rounded-md border-sky-500  border-2 
                            hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold" 
                onClick={handleSendClick}>
                Ustaw
                </button>
            </form>
            </div>
            {slotSettingsCard}
            {timeSettingCard}
        </div>

    );
}