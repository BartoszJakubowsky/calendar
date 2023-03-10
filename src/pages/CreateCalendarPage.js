import { useState } from "react";






export default function CreateCalendarPage() 
{


    const [name, setName] = useState('');

    const handleNameChange = event => setName(event.targe.value);




    return(
        <div className="relative w-screen h-screen bg-pink-400 overflow-hidden">
            <div className="absolute left-1/4 w-1/2 h-3/4 flex flex-col justify-start items-center border-black border-2 mt-10">
            <h3 className="text-white uppercase text-xl bold bg-sky-500 text-center 400 w-full p-3 select-none font-bold">
                Stwórz nowy wózek
            </h3>
            <form className=" bg-white w-full h-full flex flex-col [&>*]:mt-2">
                <label className="mt-2">
                    Nazwa wózka</label>
                <input 
                className=" bg-slate-400 mx-2"
                value={name} 
                required
                type='text'
                onChange={handleNameChange}/>

                <label className="">
                    Wybierz miesiąć lub miesiące
                </label>

                <div className="h-20 w-20 bg-slate-400 border-5 border-black">Tu będą do wyboru miesiące</div>

                <label className="">Ustawienia dodatkowe</label>
                <div>Tu będą ustawienia dodatkowe</div>
                
            </form>
            </div>
        </div>
    );
}