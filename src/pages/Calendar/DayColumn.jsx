import { useEffect, useMemo, useState } from 'react';
import useSlots from '../../hooks/useSlots';
import DayColumnHeader from './DayColumnHeader';
import DaySlot from './DaySlot';

export default function DayColumn({day, isActive, isBlank, timeArr, slots, name, date, weekIndex, dayDate, ...rest}) 
{

    //format dd.mm.yyyy
    const convertDate = (dayDate) =>
    {
        const data = dayDate
        const _day = data.getDate().toString().padStart(2, "0");
        const _month = (data.getMonth() + 1).toString().padStart(2, "0");
        const _year = data.getFullYear().toString();
        return `${_day}.${_month}.${_year}`;
    }

    const {removeAllSlots} = useSlots();
    
    useEffect(()=>
    {
        return ()=>
        {
            removeAllSlots();
        }
    },[])

    let _dayDate;

    if (dayDate)
        _dayDate = convertDate(dayDate);

    
    const daySlots = useMemo(()=>
    {
        if (isBlank)
            return false
        return (
            <>
            {timeArr.map((time, index) =>
            {   

                //cell day
                return (
                <div
                    key={index} 
                    className="flex flex-row w-full h-full  border-b-2 border-black">
                        {/* slots in cells / slots holder */}
                        {slots.map(slot =>
                        {   
                            let spaces = [];

                            for (let i = 0; i < slot.space; i++) 
                            {
                                const key = name + day+ slot.name + time + i;

                                const thisSlot = 
                                {
                                    calendar : name,
                                    date,
                                    weekIndex,
                                    day,
                                    time,
                                    slotName : slot.name,
                                    slotIndex : i,
                                    sign: '',
                                };
                                spaces.push(
                                   <DaySlot 
                                    key={key}
                                    dayDate={_dayDate}
                                    _thisSlot={thisSlot}
                                    />
                                )
                            }
                        //slot holder
                        return <div key={slot.name} className={`flex flex-col w-full h-full order-${slot.order} overflow-hidden`}>
                                {spaces}
                                </div>
                           
                        })}
                </div>)
            })}
            </>
        )
    },[])

    return (
        //column
        <div className={`flex flex-col w-full ${isBlank? 'bg-gray-400 ' : 'bg-amber-100'}  border-l-2 border-black `}  key={day}>
            <DayColumnHeader dayDate={_dayDate} day={day} slots={slots} isBlank={isBlank}/>
            {daySlots}
        </div>
    )
}