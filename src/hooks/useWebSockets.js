import { useState } from "react";

export default function useWebSockets()
{
    const [slots, setSlots] = useState([]);

    //add to 
    const addNewSlot = newSlot =>
    {
        setSlots([...slots, newSlot]);
    }
        
    const updateSlot = (newSlot, newSign) =>
    {
        console.log(slots);
        return
        const  
        {
            calendar,
            date,
            day,
            time,
            slotName,
            slotIndex,
            sign
        } = newSlot;
        let updatedIndex;

        const updatedSlots = slots.map((oldSlot, index) =>
        {
            if (calendar === oldSlot.calendar)
            if(date === oldSlot.date)
            if(day === oldSlot.day)
            if(time === oldSlot.time)
            if(slotName === oldSlot.slotName) 
            if(slotIndex === oldSlot.slotIndex) 
            {
                console.log(newSign);
                updatedIndex = index;
                return {...oldSlot, sign: newSign}
            }

            return oldSlot;
        })        
        
        setSlots(updatedSlots)
        return slots[updatedIndex];
    }

    return {addNewSlot, updateSlot};

}

