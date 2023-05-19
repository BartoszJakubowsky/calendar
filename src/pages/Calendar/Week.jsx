
import {useState } from 'react';
import classNames from 'classnames';

import DayColumn from './DayColumn';
import Time from './Time';


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
  const [timeArr, setTimeArr] = useState(generateTimes(time.timeFrom, time.timeTo, time.timeSpace));

  const weekClassName = classNames('w-full h-full overflow-y-scroll overflow-x-scroll snap snap-y snap-mandatory');
 
  return(
    <div className={weekClassName}>
     {allWeeksInMonth.map((week, index)=>
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
                key={dayIndex}
                />
              else
              return <DayColumn
                // className={dayTimeColumnClass}
                day={day.date}
                isActive={!!(allWeeksLeftInMonth[index]?.[dayIndex])}
                isBlank={true}
                slots={slots}
                key={dayIndex}
                />
            })}
            
          </section>
          )
        })}
    </div>
  )

}
    