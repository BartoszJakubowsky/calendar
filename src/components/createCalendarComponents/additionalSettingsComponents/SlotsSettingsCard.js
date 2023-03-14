import { useState } from "react";
import Input from '../Input';
import classNames from "classnames";

export default function SlotsSettingsCard({name, space ,order ,permission, close}) 
{


    const [slotName, setSlotName] = useState(name);
    const [slotSpace, setSlotSpace] = useState(space);
    const [slotOrder, setSlotOrder] = useState(order);

    const handleNameChange = event => setSlotName(event.target.value);
    const handleSlotOrder = event => setSlotOrder(event.target.value)
    const handleSpaceChange = event => 
    {
        const slotNumber = event.target.value;
        if (slotNumber > 10)
            return 
        else
            setSlotSpace(slotNumber);
    }



    const handleClick = () =>
    {
        close(false);
    }





    return (
            <div className="bg-white w-72 h-fit mx-auto mt-24 border-2 border-black relative rounded-md flex flex-col">
                <h3
                className=" bg-lime-200 py-2 text-center uppercase font-semibold rounded-md mb-2"
                >Dodatkowe ustawienia wózka</h3>
                <label className="mx-2">Nazwa dodatkowej opcji</label>
                <Input 
                className=" mx-2 my-2 rounded-md box-border h-10 border-2 border-opacity-100 hover:border-gray-400 duration-300 ease-in-out "
                calendarName={name} 
                handleNameChange={handleNameChange}/>
                <label className="mx-2">Ilość miejsc</label>
                <input 
                type='number' 
                value={slotSpace} 
                onChange={handleSpaceChange}
                className='mx-2 my-2 rounded-md box-border h-10 border-2 border-opacity-100 hover:border-gray-400 duration-300 ease-in-out'
                ></input>
                <label className="mx-2">Kolejność</label>
                <input 
                type='number' 
                value={slotOrder} 
                onChange={handleSlotOrder}
                className='mx-2 my-2 rounded-md box-border h-10 border-2 border-opacity-100 hover:border-gray-400 duration-300 ease-in-out'
                ></input>
                <button 
                className=" self-end bottom-0 left-0 right-0 mx-auto my-2
                            w-20 rounded-md border-cyan-400 border-2 
                            hover:text-white hover:bg-cyan-400 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleClick}>Dodaj</button>
            </div>
    )
}