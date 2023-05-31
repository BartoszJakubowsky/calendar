import { useEffect, useMemo, useState } from 'react';
import useSlots from '../../hooks/useSlots';
import DayColumnHeader from './DayColumnHeader';
import DaySlot from './DaySlot';
import classNames from 'classnames';

export default function DayColumn({day, isActive, isBlank, timeArr, date, weekIndex, dayDate, calendar, heigh,...rest}) 
{
    const {_id, name, slots, records} = calendar
    const {handleRecords} = useSlots();
    const calendarID = _id;





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

        handleRecords(records);

        return ()=>
        {
            removeAllSlots();
        }
    },[])

    if (calendar.bannedDays.includes(day.toUpperCase()))
        return false;

    let _dayDate;

    if (dayDate)
        _dayDate = convertDate(dayDate);

    
    const daySlots = ()=>
    {   
        console.log('ile');
        if (isBlank)
            return (
                <div className={`flex w-full h-full bg-red-200`}>
                 </div>
            )
        return (
            <>
            {timeArr.map((time, index) =>
            {   

                //cell day
                return (
                <div
                    key={index} 
                    className={`flex flex-row w-full h-full border-black`}>
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
                                    calendarID,
                                    fullDate: _dayDate,
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
                        const slotHolderClassName = classNames(`flex flex-col w-full md:h-full order-${slot.order} overflow-hidden ${heigh}`)
                        return <div key={slot.name} className={slotHolderClassName}>
                                {spaces}
                                </div>
                           
                        })}
                </div>)
            })}
            </>

        )
    };

    return (
        //column
        <div className={`flex flex-col w-full h-fit md:h-full ${isBlank? 'bg-gray-400 ' : 'bg-amber-100'}  border-l-2 border-black `}  key={day}>
            <DayColumnHeader dayDate={_dayDate} day={day} slots={slots} isBlank={isBlank}/>
            {daySlots()}
        </div>
    )
}