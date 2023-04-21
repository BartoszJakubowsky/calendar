import { useState, useEffect } from "react";
// import io from 'socket.io-client';



let isFirstMount = true;
let isInitialized = false;
let slots = [];
export default function useWebSockets(message)
{

    // const [socket, setSocket] = useState(true);
    // const [listeners, setListeners] = useState([]);
  
    // useEffect(() => {
    //   const newSocket = io('http://localhost:3000');
  
    //   newSocket.on('connect', () => {
    //     console.log('Connected to WebSocket');
    //   });
  
    //   newSocket.on('disconnect', () => {
    //     console.log('Disconnected from WebSocket');
    //   });
  
    //   newSocket.on('message', (data) => {
    //     listeners.forEach((listener) => {
    //       listener(data);
    //     });
    //   });
  
    //   setSocket(newSocket);
  
    //   return () => {
    //     newSocket.disconnect();
    //   };
    // }, []);

    //webSockets sim
    useEffect(()=>
    {
        if (isFirstMount) 
        {
            // Do something on the first mount
            console.log('First mount');
            isFirstMount = false;
        }
        //  else if (!isInitialized) 
        // {
        //     // Do something once when initialized
        //     //recive messages, send messages

        //     console.log('Initialized');
        //     isInitialized = true;
        // } else 
        // {
        //     // Do something on every subsequent mount
        //     console.log('Subsequent mount');
        // }
    })
    const addNewSlot = newSlot => slots.push(newSlot);
    
    const removeOldSlot = oldSlot => 
    {   
        slots = slots.filter(slot => 
        {
            if(
                slot.calendar !== oldSlot.calendar ||
                slot.date !== oldSlot.date ||
                slot.weekIndex !== oldSlot.weekIndex ||
                slot.day !== oldSlot.day || 
                slot.time !== oldSlot.time ||
                slot.slotIndex !== oldSlot.slotIndex
                ) return true;
            else
                return false;
        });
    }
    
    const updateSlot = newSlot =>
    {
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
                oldSlot.sign(newSlot.sign);
                //send socket message
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

