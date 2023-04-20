import { useEffect, useState } from "react";
import useWebSockets from "../../../hooks/useWebSockets";

export default function Day({calendarName, dayName, date, time, slotName, slotIndex, slotOrder, index}) 
{

        
    const {addNewSlot, updateSlot} = useWebSockets();
    const [thisSlot, setThisSlot] = useState({
        calendar : calendarName,
        date,
        day : dayName,
        time,
        slotName,
        slotIndex,
        sign: ''
        });

    useEffect(()=>
    {
        addNewSlot({
            calendar : calendarName,
            date,
            day : dayName,
            time,
            slotName,
            slotIndex,
            sign: ''
            });
    }, [])

const handleSign = name => updateSlot({...thisSlot, })
const handleClick = event =>
{
    event.preventDefault();
    const updatedSlot = updateSlot(thisSlot, 'Bartosz Jakubowski');
    return
    setThisSlot(updateSlot);
}

return (
    <button 
    className={`flex flex-1 overflow-hidden
                ${slotIndex === 0? 'border-b-2 border-red-400' : ''} 
                ${slotOrder === 1? 'border-r-2 border-red-400' : ''}
                ${thisSlot.sign === ''? 'opacity-0' : ''}`}
    onClick={handleClick}
                >{thisSlot.sign}
                
    </button>
)

}

// const tempCalendar = 
// {
//     name: 'Środa Wielkopolska', 
//     date: ['KWIECIEŃ.2023', 'MAJ.2023', 'CZERWIEC.2023', 'LIPIEC.2023'], 
//     time: {timeFrom: '08:00', timeTo: '16:00', timeSpace: '01:00'}, 
//     slots: 
//     [
//         {name: 'Oficjalne', space: '2', order: 1},
//         {name: 'Nieoficjalne', space: '2', order: '2'}
//     ]
// }

// const tempSigned = 
// {
//     calendarName : name,
//     month: date,
//     day: thisDay,
//     time: thisTime,
//     slotName: slot.name,
//     slotSpace: slot.space.slotSpace
// }
// slot = [name, order, space]
// // const [slots, setSlots] = 



