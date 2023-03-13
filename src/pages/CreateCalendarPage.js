import { useState } from "react";


import Input from '../components/createCalendarComponents/Input';
import SelectMonths from "../components/createCalendarComponents/SelectMonths";
import AdditionalSettings from "../components/createCalendarComponents/AdditionalSettings";

export default function CreateCalendarPage() 
{


    const [name, setName] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [additional, setAdditional] = useState(false);
    const [slotSettingsCard, setSlotSettingsCard] = useState(false);


    const handleNameChange = event => setName(event.target.value);
    const handleMonth = (months) => console.log(months);
    const handleYear = (year) => setYear(year)
    

    console.log(slotSettingsCard);


    
    return(
        <div className="relative w-screen h-screen bg-pink-400 overflow-hidden">
            <div className="absolute left-1/4 w-1/2 h-fit 
                            flex flex-col justify-start items-center
                             border-black border-2 
                             mt-10 
                             hover:shadow-[10px_10px_0px_0px_rgb(7_89_133)]
                             duration-300 ease-in-out" >
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
                handleMonth={handleMonth}                
                handleYear={handleYear}
                />

                <label className="">Ustawienia dodatkowe</label>
                <AdditionalSettings value={additional} onChange={setAdditional} slotCard={setSlotSettingsCard}/>
            </form>
            </div>
            {slotSettingsCard}
        </div>

    );
}