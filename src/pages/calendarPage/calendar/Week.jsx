
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import useMobileDevice from '../../../hooks/useMobileDevice';
import DayColumn from './DayColumn';
import Time from './Time';
import DaySlot from './DaySlot';


export default function Week({ allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth, time, name, slots, date}) 
{
  const DAYS_OF_WEEK = ['PONIEDZIAŁEK', 'WTOREK', 'ŚRODA', 'CZWARTEK', 'PIĄTEK', 'SOBOTA', 'NIEDZIELA'];
  const generateTimes = (timeStart, timeEnd, timeBetween) =>
  {
    const times = [];
    let currentTime = timeStart;
    
    while (currentTime <= timeEnd) {
      times.push(currentTime);
      const [hours, minutes] = currentTime.split(':');
      const currentMinutes = parseInt(hours) * 60 + parseInt(minutes);
      const beetwMinutes = parseInt(timeBetween.split(':')[0]) * 60 + parseInt(timeBetween.split(':')[1]);
      const nextMinutes = currentMinutes + beetwMinutes;
      const nextHours = Math.floor(nextMinutes / 60).toString().padStart(2, '0');
      const nextMinutesRemainder = nextMinutes % 60;
      currentTime = `${nextHours}:${nextMinutesRemainder.toString().padStart(2, '0')}`;
    }
  
    return times;
  }
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [timeArr, setTimeArr] = useState(generateTimes(time.timeFrom, time.timeTo, time.timeSpace));
  const isMobile = useMobileDevice();
  //useEffect for triggering isMobileDevice
  useEffect(() => {
    function handleResize() 
    {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const weekClassName = classNames('w-full h-full overflow-y-scroll overflow-x-scroll snap snap-y snap-mandatory');
  // const dayTimeColumnClass = classNames('h-full w-full flex flex-auto')
  if (isMobile || window.innerWidth < 1366)
  return (
    <div className={weekClassName}>
      {allDaysInMonth.map((day, index)=>
        {
              let _dayDate;
              const data = day.date;
              const _day = data.getDate().toString().padStart(2, "0");
              const _month = (data.getMonth() + 1).toString().padStart(2, "0");
              const _year = data.getFullYear().toString();
              _dayDate = `${_day}.${_month}.${_year}`;

          return (
            <section key={index} className='"w-full h-screen flex snap-start'>
            <Time timeArr={timeArr}/>
            {/* dayNameSlot + slots name */}
            <div className={`h-20 flex-none border-b-2 border-black w-full`}>
                <div className='flex flex-col justify-center items-center'>
                    <span className=' font-semibold'>{day.day}</span>
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
            {/* check if array from object is empty (if object is === {})   */}


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
                                    dayName={day.day} 
                                    dayDate={_dayDate}
                                    date={date} 
                                    time={time} 
                                    slotName={slot.name} 
                                    slotIndex={i}
                                    slotOrder={slot.order}
                                    weekIndex={index}
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

            </section>
          )
        })}
    </div>
  )
  else
  return(
    <div className={weekClassName}>
     {allWeeksLeftInMonth.map((week, index)=>
        {
          return (
            <section key={index} className={`snap-start h-full w-full bg-gray-100 flex flex-row`}>
            {/* time */}
            <Time timeArr={timeArr} 
            // className={dayTimeColumnClass}
            />
            {/* only days for this week */}

            {DAYS_OF_WEEK.map((day, dayIndex) => 
            {

              let doesDayExist = false;
              let dayDate;
              for (let i = 0; i < week.length; i++) 
              {
                const dayInWeek = week[i];
                if (dayInWeek.day.toUpperCase() === day)
                {
                  doesDayExist = true;
                  dayDate = dayInWeek.date;
                  break;
                }
              }
              if (doesDayExist)
              return <DayColumn 
                // className={dayTimeColumnClass} 
                day={day} 
                dayDate = {dayDate}
                isActive={!!(allWeeksLeftInMonth[index]?.[dayIndex])} 
                isBlank={false}
                timeArr={timeArr}
                slots={slots}
                name={name}
                date={date}
                weekIndex={index}
                />
              else
              return <DayColumn
                // className={dayTimeColumnClass}
                day={day.date}
                isActive={!!(allWeeksLeftInMonth[index]?.[dayIndex])}
                isBlank={true}
                slots={slots}/>
            })}
            
          </section>
          )
        })}
    </div>
  )

}
    