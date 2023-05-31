
import {useState } from 'react';
import classNames from 'classnames';

import DayColumn from './DayColumn';
import Time from './Time';


export default function Week({ allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth, calendar, date}) 
{


  const {time, name, slots} = calendar;
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
  const [timeArr, setTimeArr] = useState(generateTimes(time.timeFrom, time.timeTo, time.timeSpace));
  const stickyLeftSpace = [
    'left-0',
    'left-1',
    'left-2',
    'left-3',
    'left-4',
    'left-5',
    'left-6',
    'left-7',
    'left-8',
  ]


  const getSpaceOfSlot = () =>
  {
    let spaceToReturn = 0;
    for (let i = 0; i < slots.length; i++) 
    {

      const slot = slots[i];
      const spaceToInt = parseInt(slot.space);

      if (spaceToReturn < spaceToInt)
        spaceToReturn = spaceToInt;
    }

    const heigh = `h-[${spaceToReturn*100}px]`
    // const heigh = `h-24`
    console.log(heigh);


    return heigh;

  }

  const heighOfSlot = getSpaceOfSlot();

  return(
    <div className={'w-full h-full snap snap-y snap-mandatory flex overflow-x-scroll'}>
     {allWeeksLeftInMonth.map((week, index)=>
        {

          if (week.length === 0)
          return false;

          return (
            <section key={index} className={`snap-start min-w-full min-h-full border-black bg-gray-100 flex flex-row overflow-y-scroll sticky ${index === 0 || index ===  allWeeksLeftInMonth.length-1 ? 'left-0' : `${stickyLeftSpace[index]} border-l-2`}`}>
            <Time timeArr={timeArr} heigh={heighOfSlot}
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
                date={date}
                weekIndex={index}
                key={dayIndex}
                calendar={calendar}
                heigh={heighOfSlot}
                />
              else
              return <DayColumn
                // className={dayTimeColumnClass}
                day={day}
                isActive={!!(allWeeksLeftInMonth[index]?.[dayIndex])}
                isBlank={true}
                key={dayIndex}
                calendar={calendar}
                />
            })}
          </section>
          )
        })}
    </div>
  )

}
    