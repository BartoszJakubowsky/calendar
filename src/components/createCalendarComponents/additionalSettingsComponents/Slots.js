import { useState } from "react"
import SlotSettingsCard from './SlotsSettingsCard';

export default function Slots({slots, slotCard}) 
{
    //in the future addidiotn settings with permisision

    const [name, setName] = useState('');


    const handleCreateClick = event =>
    {
        event.preventDefault();
        slotCard(<SlotSettingsCard close={slotCard}/>)
    }


    const showSlots = slots.map(slot=>
        {
            return(
                <div key={slot.order} className='w-10 h-10 bg-slate-500'></div>
            )
        })

    return (
        <div className="flex flex-row">
            <button onClick={handleCreateClick}>Dodaj slot</button>
            {showSlots}
        </div>
    )    
}