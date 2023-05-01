import DaySlot from './DaySlot';

export default function DayColumn({day, isActive, isBlank, timeArr, slots, name, date, weekIndex, dayDate, ...rest}) 
{
    let _dayDate;
    if (dayDate)
    {
        
        const data = dayDate
        const _day = data.getDate().toString().padStart(2, "0");
        const _month = (data.getMonth() + 1).toString().padStart(2, "0");
        const _year = data.getFullYear().toString();
        _dayDate = `${_day}.${_month}.${_year}`;
    }

    if (isBlank)
        return (
            <div className={` bg-gray-400 flex flex-col w-full border-l-2 border-black`} key={day}>
                <div className={`h-10 border-black w-full opacity-0`}>
                {day}
                {/* slots name holder */}
                <div className="overflow-hidden flex flex-none opacity-0"> 
                {slots.map(slot => {
                return (
                    <span className="inline-block overflow-hidden w-full">{slot.name}</span>
                );
            })}
                </div>
            </div>
            </div>
        )
    return (
        //column
        <div className={`flex flex-col w-full bg-amber-100 border-l-2 border-black `}  key={day}>
            {/* //first cell in day column for day name*/}
            <div className={`h-20 flex-none border-b-2 border-black w-full`}>
                <div className='flex flex-col justify-center items-center'>
                    <span className=' font-semibold'>{day}</span>
                    <span>{_dayDate}</span>
                </div>
                {/* slots name holder */}
                <div className="overflow-hidden flex flex-none "> 
                {slots.map(slot => {
                return (
                    <span className="inline-block overflow-hidden w-full">{slot.name}</span>
                );
            })}
                </div>
            </div>  
            {/* rest of cells/days  based on time spaces */}
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
                                spaces.push(
                                   <DaySlot 
                                    calendarName={name} 
                                    dayName={day} 
                                    dayDate={_dayDate}
                                    date={date} 
                                    time={time} 
                                    slotName={slot.name} 
                                    slotIndex={i}
                                    slotOrder={slot.order}
                                    weekIndex={weekIndex}
                                    />
                                )
                            }
                        //slot holder
                        return <div className={`flex flex-col w-full h-full order-${slot.order} overflow-hidden`}>
                                {spaces}
                                </div>
                           
                        })}
                </div>)
            })}
        </div>
    )
}