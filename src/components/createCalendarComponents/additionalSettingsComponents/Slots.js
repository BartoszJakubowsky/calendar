import { useState } from "react"
import SlotSettingsCard from './SlotsSettingsCard';
import {HiPlus as addOptionIcon} from 'react-icons/hi';



export default function Slots({slots, slotCard, onChange}) 
{
    //in the future addidiotn settings with permisision

    const showSlots = slots.map(slot=>
    {
        const handleSlotChange = newSlot => onChange([slot, newSlot]);
        const handleClick = event => 
        {
            event.preventDefault();
            slotCard(<SlotSettingsCard close={slotCard} name={slot.name} space={slot.space} order={slot.order} onChange={handleSlotChange}/>)
        }

            return(
                <button
                    key={slot.order} 
                    slotname={slot.name}
                    slotspace={slot.space}
                    slotorder={slot.order}
                    onClick={handleClick}
                    className='w-10 h-10 bg-slate-500 overflow-hidden'>
                    {slot.name}
                    </button>
            )
        })

    return (
        <div className="flex flex-row [&>*]:h-10 items-center justify-center">
            {showSlots}
        </div>
    )    
}