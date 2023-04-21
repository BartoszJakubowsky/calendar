import { useEffect, useState } from "react";
import useWebSockets from "../../../hooks/useWebSockets";

export default function Day({calendarName, dayName, date, time, slotName, slotIndex, slotOrder, weekIndex}) 
{


    const [sign, setSign] = useState('');
    const handleSign = newName => setSign(newName);
    const thisSlot = 
    {
        calendar : calendarName,
        date,
        weekIndex,
        day : dayName,
        time,
        slotName,
        slotIndex,
        sign: handleSign
    };

    const {addNewSlot, updateSlot, removeOldSlot} = useWebSockets();

    useEffect(() => 
    {
       addNewSlot(thisSlot)

       //remove this listener from listeners
       return () => removeOldSlot(thisSlot)
    }, []);


// const handleSign = name => updateSlot({...thisSlot, })
const handleClick = event =>
{
    event.preventDefault();
    console.log(weekIndex);
    updateSlot({...thisSlot, sign: 'Bartosz Jakubowski'});
}


return (
    <button 
    className={`overflow-hidden w-full h-full
                ${slotIndex === 0? 'border-b-2 border-red-400 bg-red-200' : ''} 
                ${slotOrder === 1? 'border-r-2 border-red-400 bg-red-400' : ''}
                ${sign === ''? '' : ''}`}
    onClick={handleClick}
                >{sign}
                
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



