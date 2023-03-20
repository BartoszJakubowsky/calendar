import { useState } from "react";
import Input from '../Input';
import classNames from "classnames";

export default function SlotsSettingsCard({name, space ,order ,permission, close, onChange}) 
{


    const [slotName, setSlotName] = useState("name");
    const [slotSpace, setSlotSpace] = useState(space || 1);
    const [slotOrder, setSlotOrder] = useState(order || 1);

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


    const handleAddClick = () => 
    {
        onChange(slotName, slotSpace, slotOrder);
        close(false)
    };





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
                className=" self-end right-0 mx-auto my-2
                            w-20 rounded-md border-sky-500  border-2 
                            hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleAddClick}>Dodaj</button>
            </div>
    )
}