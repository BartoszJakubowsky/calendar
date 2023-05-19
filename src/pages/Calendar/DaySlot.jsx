import { useEffect, useState } from "react";
import { useTransition, animated } from 'react-spring';
import { v4 as uuidv4 } from 'uuid';
import useSocket from "../../hooks/useSocket";


import useSlot from "../../hooks/useSlot";
import useCalendars from "../../hooks/useCalendars";

export default function Day({calendarName, dayName, date, time, slotName, slotIndex, dayDate, slotOrder, weekIndex}) 
{
    const user = {name: 'Bartosz Jakubowski', rights: 'user'};
    const [sign, setSign] = useState('');
    const handleSign = newName => setSign(newName);

    const {socket} = useSocket();

    const thisSlot = 
    {
        calendar : calendarName,
        date,
        weekIndex,
        day : dayName,
        time,
        slotName,
        slotIndex,
        sign: handleSign,
        id: uuidv4()
    };

    const {addNewSlot, updateSlot, removeOldSlot} = useSlot();
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

    if (sign === user.name)
    {
        const message = `Czy na pewno chcesz wypisać się z dnia ${dayName.toLowerCase()} ${dayDate}, godzina ${time}?`
        const submit = "Wypisz mnie"    
        setConvirm({message : message, submit : submit, handleSubmit : handleUnsignClick})
        // handleUnsignClick(true);

    }
    else
    {
        const message = `Czy na pewno chcesz zapisać się na ${time} w ${dayName.toLowerCase()} ${dayDate}?`
        const submit = "Zapisz mnie"
        setConvirm({message : message, submit : submit, handleSubmit : handleSignClick})
        // handleSignClick(true);

    }
}

const handleSignClick = (confirmed) =>
{

    if (!confirmed)
        return

    const newSlot = {...thisSlot, sign: user.name}
    socket();
    updateSlot(newSlot);
}

const handleUnsignClick = (confirmed) =>
{
    if (!confirmed)
        return

    updateSlot({...thisSlot, sign: ''});
}


const duration = 300;
const defaultStyle = {
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

  const transitions = useTransition(sign !== '', {
    from: defaultStyle,
    enter: transitionStyles.entering,
    leave: transitionStyles.exiting,
    config: {
      duration,
    },
  });

  return (
    <button
      className={`overflow-hidden w-full h-full border-2 border-red-200 duration-150 hover:backdrop-brightness-90 text-center
        ${sign === '' ? '' : ''}
        ${sign !== user.name && sign !== '' ? 'cursor-not-allowed pointer-events-none' : ''}
      `}
      onClick={handleClick}
    >
      {transitions((style, item) =>
        item && (
          <animated.span style={style}>
            {sign}
          </animated.span>
        )
      )}
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



