import {useState } from "react";
import Close from '../../Close'


export default function TimeSettingsCard({calendarTimeFrom, calendarTimeTo, calendarTimeSpace, onChange, close}) 
{

    //add max value to time space calculated from timeFrom - timeTo
    //add warnigns and 


    
    const [timeFrom, setTimeFrom] = useState(calendarTimeFrom || '');
    const [timeTo, setTimeTo] = useState(calendarTimeTo || '');
    const [timeSpace, setTimeSpace] = useState(calendarTimeSpace || '');


    const handleTimeFromChange = event => setTimeFrom(event.target.value);
    const handleTimeToChange = event => setTimeTo(event.target.value);
    const handleTimeSpaceChange = event => 
    {
        const chosedTimeSpace = event.target.value;

        if (chosedTimeSpace !== timeTo)
          setTimeSpace(chosedTimeSpace);
        else
            return 
    }
    const handleCloseClick = () => close(false);

    const handleChangeClick = event => 
    {
        event.preventDefault();

        onChange({calendarTimeFrom: timeFrom, calendarTimeTo: timeTo, calendarTimeSpace: timeSpace});
        handleCloseClick();
    };
 
    const timeInputClassName = 'w-20 h-10 font-semibold'
    return (
            <div className="bg-white w-72 h-fit mx-auto mt-24 border-2 border-black relative rounded-md flex flex-col">
                <h3
                className=" bg-violet-200 py-2 uppercase font-semibold rounded-t-md mb-2 pl-2"
                >Ustawienia czasu
                <Close onClick={handleCloseClick}/>
                    
                </h3>
                <div className="flex-row">
                    <label className="mx-2">Godziny od:</label>
                    <input 
                        className={timeInputClassName}
                        type='time' 
                        // min={6} 
                        // max={18} 
                        value={timeFrom} 
                        onChange={handleTimeFromChange}
                    />
                    </div>
                <div className="flex-row">
                    <label className="mx-2">Godziny do:</label>
                    <input 
                        type='time' 
                        // min={6} 
                        // max={18} 
                        value={timeTo} 
                        onChange={handleTimeToChange}
                        className={timeInputClassName}
                    />
                 </div>

                 <div className="flex-row">
                    <label className="mx-2">Czas slotów:</label>
                    <input 
                        type='time' 
                        value={timeSpace} 
                        // max={(timeTo-timeFrom) || ''}
                        onChange={handleTimeSpaceChange}
                        className={timeInputClassName}
                    />
                </div>
                <div className="flex justify-center [&>button]:mx-1 my-2">
                <button 
                className="w-20 rounded-md border-sky-500  border-2 
                            hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleChangeClick}>Ustaw</button>
                </div>
            </div>
    )
}


// <input 
//                 type='time' 
//                 min={6} 
//                 max={18} 
//                 value={value} 
//                 onChange={handeTimeChange}
//                 className='w-20 h-10 border-grey-500 border-2'
//                 />} 