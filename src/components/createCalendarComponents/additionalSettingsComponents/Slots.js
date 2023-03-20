import { useState } from "react"
import SlotSettingsCard from './SlotsSettingsCard';
import {HiPlus as addOptionIcon} from 'react-icons/hi';



export default function Slots({slots, slotCard, onChange}) 
{
    //in the future addidiotn settings with permisision


    const showSlots = slots.map(slot=>
    {
        const handleSlotChange = newSlot => onChange(slot, newSlot);
        const handleClick = (name, space, order) => slotCard(<SlotSettingsCard close={slotCard} name={name} space={space} order={order} onChange={handleSlotChange}/>)

            return(
                <button
                    key={slot.order} 
                    slotName={slot.name}
                    slotSpace={slot.space}
                    slotOrder={slot.order}
                    onClick={()=>handleClick(this.slot.name, this.slot.space, this.slot.order)}
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