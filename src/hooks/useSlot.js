import { useState, useEffect } from "react";
import { update } from "react-spring";
// import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';


//slot example
/*
{
    "calendar": "Środa Wielkopolska",
    "date": "KWIECIEŃ.2023",
    "weekIndex": 4,
    "day": "ŚRODA",
    "time": "08:00",
    "slotName": "Oficjalne",
    "slotIndex": 0,
    "sign": "Bartosz Jakubowski"
}
*/

//  const socket = io.connect();
    
//  socket.on('connect', (data) => 
//  {
//  });
//  socket.on('messages', (data) => 
//  {

//  });

let isInitialized = false;
let slots = [];

export default function useSlot(message)
{

    //only for client 
    const addNewSlot = newSlot => slots.push(newSlot);
    //on page onmount
    const removeOldSlot = oldSlot => 
    {   
        slots = slots.filter(slot => 
        {
            // if(
            //     slot.calendar !== oldSlot.calendar ||
            //     slot.date !== oldSlot.date ||
            //     slot.weekIndex !== oldSlot.weekIndex ||
            //     slot.day !== oldSlot.day || 
            //     slot.time !== oldSlot.time ||
            //     slot.slotIndex !== oldSlot.slotIndex
            //     ) return true;
            if (slot.id === oldSlot.id)
                return true;
            else
                return false;
        });
    }
    
    const updateSlot = newSlot =>
    {
            console.log(newSlot);
             console.log('add')

            for (let i = 0; i < slots.length; i++) 
            {
            const oldSlot = slots[i];
                
            if(newSlot.calendar === oldSlot.calendar)
            if(newSlot.date === oldSlot.date)
            if(newSlot.weekIndex === oldSlot.weekIndex)
            if(newSlot.day === oldSlot.day)
            if(newSlot.time === oldSlot.time)
            if(newSlot.slotName === oldSlot.slotName) 
            if(newSlot.slotIndex === oldSlot.slotIndex) 
            {

                // if (oldSlot.id? 'send obj with new id as post through web sockets' : 'send obj as actualization')
                oldSlot.sign(newSlot.sign);
            }
        }
    }

    return {addNewSlot, updateSlot, removeOldSlot};
  };










//     const addNewSlot = newSlot =>
//     {
//         setSlots([...slots, newSlot]);
//     }
        
//     const updateSlot = (newSlot, newSign) =>
//     {
//         let updatedIndex; 

//         const updatedSlots = slots.map((oldSlot, index) =>
//         {

//             if (newSlot.calendar === oldSlot.calendar)
//             if(newSlot.date === oldSlot.date)
//             if(newSlot.day === oldSlot.day)
//             if(newSlot.time === oldSlot.time)
//             if(newSlot.slotName === oldSlot.slotName) 
//             if(newSlot.slotIndex === oldSlot.slotIndex) 
//             {
//                 console.log(newSign);
//                 updatedIndex = index;
//                 return {...oldSlot, sign: newSign}
//             }

//             return oldSlot;
//         })        
        
//         setSlots(updatedSlots)
//         return slots[updatedIndex];
//     }

//     return {addNewSlot, updateSlot};

// }

