import { useEffect, useState } from "react";
import Input from '../Input';
import classNames from "classnames";
import {HiOutlineX as CloseSlotSettingsIcon} from 'react-icons/hi';



let showRemoveButton;

export default function SlotsSettingsCard({name, space ,order ,permission, close, onChange}) 
{


    const [slotName, setSlotName] = useState(name || '');
    const [slotSpace, setSlotSpace] = useState(space || 1);
    const [slotOrder, setSlotOrder] = useState(order || 1);

    useEffect(()=>
    {
        console.log(name === slotName && space === slotSpace && order === slotOrder);
        if (name === slotName && space === slotSpace && order === slotOrder)
            showRemoveButton = true

        else if (name === '' && space === 1 && order === 1)
            showRemoveButton = false;
        else 
            showRemoveButton = false;
    },);


    const handleNameChange = event => setSlotName(event.target.value);
    const handleSlotOrder = event => setSlotOrder(event.target.value)
    const handleCloseClick = () => close(false);
    const handleSpaceChange = event => 
    {
        const slotNumber = event.target.value;
        if (slotNumber > 10)
            return
        else
            setSlotSpace(slotNumber);
    }
    const handleAddClick = event => 
    {
        event.preventDefault();

        onChange({name: slotName, space: slotSpace, order: slotOrder});
        handleCloseClick()
    };
    const handleRemoveClick = event => 
    {
        event.preventDefault();
        onChange(false);
        handleCloseClick();
    }


    console.log(showRemoveButton);
    return (
            <div className="bg-white w-72 h-fit mx-auto mt-24 border-2 border-black relative rounded-md flex flex-col">
                <h3
                className=" bg-lime-200 py-2 uppercase font-semibold rounded-md mb-2 pl-2"
                >Dodatkowe ustawienia wózka
                <CloseSlotSettingsIcon 
                    className="bg-red-400 absolute top-0 right-0 rounded-sm cursor-pointer hover:bg-red-500 duration-150 hover:text-lg"
                    onClick={handleCloseClick}
                />
                    
                </h3>
                <label className="mx-2">Nazwa dodatkowej opcji</label>
                <Input 
                className=" mx-2 my-2 rounded-md box-border h-10 border-2 border-opacity-100 hover:border-gray-400 duration-300 ease-in-out "
                calendarName={slotName} 
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
                <div className="flex justify-center [&>button]:mx-1 my-2">
                <button 
                className="w-20 rounded-md border-sky-500  border-2 
                            hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleAddClick}>Dodaj</button>
                {showRemoveButton && <button 
                className="w-20 rounded-md border-red-400  border-2 
                            hover:text-white hover:bg-red-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleAddClick}>Usuń</button>}
                </div>
            </div>
    )
}