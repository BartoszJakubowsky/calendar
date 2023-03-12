import { useState } from "react";


import Input from '../components/createCalendarComponents/Input';
import SelectMonths from "../components/createCalendarComponents/SelectMonths";



export default function CreateCalendarPage() 
{


    const [name, setName] = useState('');

    const handleNameChange = event => setName(event.target.value);




    
    return(
        <div className="relative w-screen h-screen bg-pink-400 overflow-hidden">
            <div className="absolute left-1/4 w-1/2 h-3/4 
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
                
                />

                <label className="">Ustawienia dodatkowe</label>
                <div>Tu będą ustawienia dodatkowe</div>
                
            </form>
            </div>
        </div>
    );
}