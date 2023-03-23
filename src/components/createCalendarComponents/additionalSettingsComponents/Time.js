import { useState } from 'react';
import {HiOutlineClock as AddTimeIcon} from 'react-icons/hi';
import TimeSettingsCard from './TimeSettingsCard';

export default function Time({value, onChange, timeCard}) 
{


    const [showDefaultWatch, setShowDefaultWatch] = useState(true);

    const handeTimeChange = event =>
    {
        onChange(event.target.value)
        console.log(value);
    }

    const handleWatchClick = () =>
    {
        setShowDefaultWatch(false);
        timeCard(<TimeSettingsCard/>);

    }

    const ShowTime = <div className='w-10 h-10 '>
                        {value.timeFrom}
                        {value.timeFrom}
                    </div>

    const DefaultTimeIcon = <button 
                                onClick={handleWatchClick}
                                className='h-10 w-10 flex items-center justify-center text-cyan-900 cursor-pointer text-lg ease-out'>
                            <AddTimeIcon/>
                            </button>


    return (
        <div className=' flex justify-center items-center cursor-pointer'>
            {(showDefaultWatch && 
             <DefaultTimeIcon></DefaultTimeIcon>) || 
                <ShowTime></ShowTime>}
        </div>
    )    
}