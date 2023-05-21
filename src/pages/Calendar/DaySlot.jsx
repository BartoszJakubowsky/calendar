import {useState } from "react";
import { useTransition, animated } from 'react-spring';

import useCalendars from "../../hooks/useCalendars";

export default function Day({thisSlot, dayDate}) 
{
    const user = {name: 'Bartosz Jakubowski', rights: 'user'};
    const [sign, setSign] = useState('');

    // const thisSlot = 
    // {
    //     calendar : calendarName,
    //     date,
    //     weekIndex,
    //     day : dayName,
    //     time,
    //     slotName,
    //     slotIndex,
    //     sign: handleSign,
    //     id: uuidv4()
    // };
    const {convirm, setConvirm} = useCalendars();
    

const handleClick = event =>
{
    event.preventDefault();

    //unsign
    if (sign === user.name)
    {
        const message = `Czy na pewno chcesz wypisać się z dnia ${thisSlot.day.toLowerCase()} ${dayDate}, godzina ${thisSlot.time}?`
        const submit = "Wypisz mnie"    
        setConvirm({message : message, submit : submit, handleSubmit : handleUnsignClick})
        // handleUnsignClick(true);

    }
    //sign
    else
    {
        const message = `Czy na pewno chcesz zapisać się na ${thisSlot.time} w ${thisSlot.day.toLowerCase()} ${dayDate}?`
        const submit = "Zapisz mnie"
        setConvirm({message : message, submit : submit, handleSubmit : handleSignClick})
        // handleSignClick(true);

    }
}
const handleSignClick = (confirmed) =>
{

    if (!confirmed)
        return

    setSign(user.name);
    thisSlot.sign(user.name)
}

const handleUnsignClick = (confirmed) =>
{
    if (!confirmed)
        return

        setSign('');
        thisSlot.sign('');

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



