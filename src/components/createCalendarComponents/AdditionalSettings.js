import Time from './additionalSettingsComponents/Time';
import Slots from './additionalSettingsComponents/Slots';
import { useState } from 'react';




export default function AdditionalSettings({value, onChange, slotCard}) 
{

    const [time, setTime] = useState(false);
    const [slots, setSlots] = useState([]);
    return (
        <div>
            <Time/>
            <Slots slots={slots} slotCard={slotCard}/>
        </div>
    )
}