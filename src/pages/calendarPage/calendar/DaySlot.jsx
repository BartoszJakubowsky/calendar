import { useEffect, useState } from "react";
import useWebSockets from "../../../hooks/useWebSockets";
import Convirm from '../../../components/Convirm';
import useCalendars from "../../../hooks/useCalendars";
import { Transition } from "react-transition-group";

export default function Day({calendarName, dayName, date, time, slotName, slotIndex, dayDate, slotOrder, weekIndex}) 
{
    const user = {name: 'Bartosz Jakubowski', rights: 'user'};
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
    const {convirm, setConvirm} = useCalendars();
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
    const signedName = event.target.innerHTML;

    if (signedName === user.name)
    {
        const message = `Czy na pewno chcesz wypisać się z dnia ${dayName.toLowerCase()} ${dayDate}, godzina ${time}?`
        const submit = "Wypisz mnie"    
        setConvirm(<Convirm message={message} submit={submit} handleSubmit={handleUnsignClick}/>)

    }
    else
    {
        const message = `Czy na pewno chcesz zapisać się na ${time} w ${dayName.toLowerCase()} ${dayDate}?`
        const submit = "Zapisz mnie"
        setConvirm(<Convirm message={message} submit={submit} handleSubmit={handleSignClick}/>)
    }
}

const handleSignClick = (confirmed) =>
{
    if (!confirmed)
        return

    updateSlot({...thisSlot, sign: user.name});
}

const handleUnsignClick = (confirmed) =>
{
    if (!confirmed)
        return

    updateSlot({...thisSlot, sign: ''});
}


const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
  opacity: 0,
  transform: 'translateX(-50%)',
  display: 'inline-block',
};
const transitionStyles = {
  entering: { opacity: 1, transform: 'translateX(0)' },
  entered: { opacity: 1, transform: 'translateX(0)' },
  exiting: { opacity: 0, transform: 'translateX(-50%)' },
  exited: { opacity: 0, transform: 'translateX(-50%)' },
};

return (
  <button
    className={`overflow-hidden w-full h-full border-2 border-red-200 
      ${sign === '' ? '' : ''}
      ${sign !== user.name && sign !== '' ? 'cursor-not-allowed pointer-events-none' : ''}
    `}
    onClick={handleClick}
  >
    <Transition in={sign !== ''} timeout={duration} >
      {state => (
        <span
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          {sign}
        </span>
      )}
    </Transition>
  </button>
);


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



