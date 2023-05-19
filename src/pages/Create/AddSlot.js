import SlotSettingsCard from './SlotsSettingsCard';
import {HiPlus as AddOptionIcon} from 'react-icons/hi';



export default function Slots({slotCard, onChange}) 
{
    //in the future addidiotn settings with permisision


    const handleCreateClick = event =>
    {
        event.preventDefault();
        slotCard(<SlotSettingsCard close={slotCard} onChange={onChange}/>)
    }


   
    return (
            <button 
                onClick={handleCreateClick} 
                className='h-10 w-10 flex items-center justify-center text-cyan-900 cursor-pointer text-lg ease-out'
            ><AddOptionIcon/></button>
    )    
}