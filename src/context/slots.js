import { createContext, useState} from "react";
import useWebsockets from "../hooks/useWebsockets";
import io from "socket.io-client";

const SlotsContext = createContext();


function SlotsProvider({children}) 
{

    const socket = io.connect("http://localhost:3002");
        
    socket.on("connected", (data) => 
    {
        console.log('Websockets connected');
        console.log(data)
    });

    socket.on('sign', data => 
    {   
        if(data.id === socket.id)
            return;
        
        
        updateSlot(data.message);
    })

    const emitMessage = message =>
    {
        socket.emit('message', {message, id: socket.id});
    }

    // const _disconnectSocket = () =>
    // {
    //     socket.disconnect();
    //     console.log('Websockets disconnect')
    // }











    let slotsArray = [];
    const updateSlotsArray = newSlots =>
    {
        slotsArray.push(...newSlots);
    }

    const removeAllSlots = () =>
    {
        if (slotsArray.length!==0)
        {
            slotsArray = [];
        }
        
    }
 
    const updateSlot = (newSlot) =>
    {   
            for (let i = 0; i < slotsArray.length; i++) 
            {
            const oldSlot = slotsArray[i];
            if(newSlot.calendar === oldSlot.calendar)
            if(newSlot.date === oldSlot.date)
            if(newSlot.weekIndex === oldSlot.weekIndex)
            if(newSlot.day === oldSlot.day)
            if(newSlot.time === oldSlot.time)
            if(newSlot.slotName === oldSlot.slotName) 
            if(newSlot.slotIndex === oldSlot.slotIndex) 
            {
                // const updatedSlots = 
                // [
                //     ...slotsArray.slice(0, i),
                //     newSlot,
                //     ...slotsArray.slice(i)
                // ]
                // setSlotsArray(updatedSlots);
                oldSlot.name = newSlot.name;
                // example({...newSlot, sign: 'Dupsko Wołowe'})
                oldSlot.handleSign(newSlot);
                return;
            }
        }

    }

    const toProvide = 
    {slotsArray, updateSlot ,updateSlotsArray, removeAllSlots, emitMessage};
    return (
        <SlotsContext.Provider value={toProvide}>
            {children}
        </SlotsContext.Provider>
        );
}

export {SlotsProvider};
export default SlotsContext;


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