import Time from './additionalSettingsComponents/Time';
import Slots from './additionalSettingsComponents/Slots';
import AddSlot from './additionalSettingsComponents/AddSlot';

import { useState } from 'react';




export default function AdditionalSettings({value, onChange, slotCard}) 
{

    const [time, setTime] = useState(false);
    const [slots, setSlots] = useState([]);
    const handleSlotChange = slot =>
    {

        // new slot
        //slot
        if (!Array.isArray(slot))
        {
            const newSlots = [...slots, slot];
            setSlots(newSlots);
        }
        //update slot or delete slot
        else
        {
            const oldSlot = slot[0];
            const newSlot = slot[1];

            const oldSlotIndex = slots.indexOf(oldSlot);
            
            //delete slot
            //slot, false
            if (!newSlot)
            {
                const newSlots = slots.filter((oldSlot, index) =>
                {
                    return index !== oldSlotIndex
                })
                
                    setSlots(newSlots);
            }
            //update slot
            //slot, slot
            else
            {
                const newSlots = slots.map((oldSlot, index)=>
                {
                    if (index === oldSlotIndex)
                        return {...oldSlot, name:newSlot.name, space: newSlot.space, order:newSlot.order}
                    else
                        return oldSlot
                })
                setSlots(newSlots)
            }

        }


    }


    return (
        <div className='flex  text-cyan-900 cursor-pointer text-lg ease-out'>
            <Time/>
            <AddSlot slots={slots} slotCard={slotCard} onChange={handleSlotChange}/>
            <Slots slots={slots} slotCard={slotCard} onChange={handleSlotChange}/>
        </div>
    )
}
