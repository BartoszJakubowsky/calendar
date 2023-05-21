import { createContext, useState} from "react";

const SlotsContext = createContext();


function SlotsProvider({children}) 
{

    const [slotsArray, setSlotsArray] = useState([]);

    //leaved for optional future purpose 

    // //on page onmount
    // const removeOldSlot = oldSlot => 
    // {   
    //     slots = slots.filter(slot => 
    //     {
    //         // if(
    //         //     slot.calendar !== oldSlot.calendar ||
    //         //     slot.date !== oldSlot.date ||
    //         //     slot.weekIndex !== oldSlot.weekIndex ||
    //         //     slot.day !== oldSlot.day || 
    //         //     slot.time !== oldSlot.time ||
    //         //     slot.slotIndex !== oldSlot.slotIndex
    //         //     ) return true;
    //         if (slot.id === oldSlot.id)
    //             return true;
    //         else
    //             return false;
    //     });
    // }
    const updateSlotsArray = newSlots =>
    {
        setSlotsArray(...slotsArray, ...newSlots);
    }

    const removeAllSlots = () =>
    {
        setSlotsArray([]);
    }

    const updateSlot = newSlot =>
    {

            for (let i = 0; i < slotsArray.length; i++) 
            {
            const oldSlot = slotsArray[i];
            console.log('old', oldSlot);
            if(newSlot.calendar === oldSlot.calendar)
            if(newSlot.date === oldSlot.date)
            if(newSlot.weekIndex === oldSlot.weekIndex)
            if(newSlot.day === oldSlot.day)
            if(newSlot.time === oldSlot.time)
            if(newSlot.slotName === oldSlot.slotName) 
            if(newSlot.slotIndex === oldSlot.slotIndex) 
            {
                oldSlot.sign(newSlot.sign);
                const updatedSlots = 
                [
                    ...slotsArray.slice(0, i),
                    newSlot,
                    ...slotsArray.slice(i)
                ]
                
                setSlotsArray(updatedSlots);
            }
        }
    }

    const toProvide = 
    {slotsArray, updateSlot ,updateSlotsArray, removeAllSlots};
    return (
        <SlotsContext.Provider value={toProvide}>
            {children}
        </SlotsContext.Provider>
        );
}

export {SlotsProvider};
export default SlotsContext;