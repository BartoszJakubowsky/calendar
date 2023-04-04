import { useState } from 'react';
import {HiOutlineClock as AddTimeIcon} from 'react-icons/hi';
import TimeSettingsCard from './TimeSettingsCard';
import classNames from 'classnames';

export default function Time({value, onChange, timeCard}) 
{


    const [showDefaultWatch, setShowDefaultWatch] = useState(true);
    const [isWatchClicked, setIsWatchClicked] = useState(false);
    const handleTimeChange = event =>
    {
        // onChange(event.target.value)
        console.log(event);
    }




    const handleCloseClick = close => 
    {
        setIsWatchClicked(false);
        timeCard(close);
    }


    const handleWatchClick = event =>
    {
        event.preventDefault();
        setIsWatchClicked(!isWatchClicked);
        timeCard(<TimeSettingsCard calendarTimeFrom={value.timeFrom} calendarTimeTo={value.timeTo} calendarTimeSpace={value.timeSpace} onChange={handleTimeChange} close={handleCloseClick}/>);

    }

    const showTime = <div className='w-10 h-10 '>
                        {value.timeFrom}
                        {value.timeFrom}
                    </div>



    const defaultTimeIconClassName = classNames('h-10 w-10 flex items-center justify-center  cursor-pointer text-lg ease-out', 
                                                isWatchClicked? 'text-cyan-600' : 'text-cyan-900' )
    


    return (
        <div className=' flex justify-center items-center cursor-pointer'>
            <button 
                onClick={handleWatchClick}
                className={defaultTimeIconClassName}>
                <AddTimeIcon/>
                {/* add here something like && value.time && value.time -> it will show small time for clock  */}
                </button>
        </div>
    )    
}