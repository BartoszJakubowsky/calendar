import { createContext, useEffect, useState} from "react";
import useWebsockets from "../hooks/useWebsockets";
import io from "socket.io-client";
import useAuthentication from "../hooks/useAuthentication";
const SlotsContext = createContext();


function SlotsProvider({children}) 
{
    const {isAuthenticated} = useAuthentication();
    if (!isAuthenticated)
    return (
        <SlotsContext.Provider value={null}>
            {children}
        </SlotsContext.Provider>
    )


    const socket = io.connect(window.location.origin);
    // const socket = io.connect('http://localhost:3002/');
        
    socket.on("connected", (data) => 
    {
    });

    socket.on('sign', data => 
    {   
        if(data.id === socket.id)
            return;
        
        
        updateSlot(data.message);
    })

    const emitMessage = message =>
    {
        console.log('emit');
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

    const handleRecords = (records) =>
    {
        for (let i = 0; i < records.length; i++) 
        {
            const slot = records[i];
            updateSlot(slot);
        }
    }

    const toProvide = 
    {slotsArray, updateSlot ,updateSlotsArray, removeAllSlots, emitMessage, handleRecords};
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