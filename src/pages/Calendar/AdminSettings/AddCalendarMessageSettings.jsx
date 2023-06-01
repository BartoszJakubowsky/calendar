import { useState } from 'react';
import Close from '../../../components/ui/Close';
import SelectGroups from './SelectGroups';
import SelectTimes from './SelectTimes';
import useCalendars from '../../../hooks/useCalendars';
export default function AddCalendarMessageSettings({timeArr, dayDate, slotMessage, setDisplayedFrom, calendar}) 
{
    let showRemoveButton = false;
    if (slotMessage)
        showRemoveButton = true;
    
    const {updateCalendar} = useCalendars();
    const [slotMessageError, setSlotMessageError] = useState(false);
    const [thisSlotMessage, setSlotMessage] = useState(slotMessage.thisSlotMessage || '');
    const [selectedGroups, setSelectedGroups] = useState(slotMessage.selectedGroups || []);
    const [selectedTimes, setSelectedTimes] = useState(slotMessage.selectedTimes || []);

    const groups = ['GRUPA 1', 'GRUPA 2', 'GRUPA 3', 'GRUPA 4', 'GRUPA 5', 'GRUPA 6'];


    const handleSlotNameError = (boolean) => setSlotMessageError(boolean);

    // const handleCloseClick = () => close(false)
    const handleCloseClick = () => setDisplayedFrom(0)


    const handleSlotNameChange = (event) => {
        setSlotMessage(event.target.value);
    }
    const handleAddClick = event => 
    {
        event.preventDefault();
        console.log(thisSlotMessage, selectedGroups, dayDate, selectedTimes);

        const newCalendar = {...calendar, slotMessages : [{thisSlotMessage, selectedGroups, dayDate, selectedTimes}]}

        updateCalendar(calendar, newCalendar);

        handleCloseClick()
    };
    
    const handleRemoveClick = event => 
    {
        event.preventDefault();
        console.log('dodać usuń opcję slotmessages');
        handleCloseClick(0);
    }

    return (
        <div>
            <h3
            className=" bg-violet-200 py-2 uppercase font-semibold  mb-2 pl-2"
            >{slotMessage !== false? 'Dodaj wiadomość' : 'Edytuj wiadomość'}
            <Close onClick={handleCloseClick}/>
                
            </h3>
            <form className=" bg-white w-full h-full flex flex-col [&>*]:mt-2 [&>*]:mx-2 [&>label]:uppercase ">
                <label className={`mx-2 duration-75  ${slotMessageError? 'valid text-red-300' : 'text-normal'}`} form='text'>Treść wiadomości</label>
                <textarea 
                type='text'
                className=" h-20 border-2 border-opacity-100 rounded-sm hover:border-gray-400 duration-300 ease-in-out"
                value={thisSlotMessage} 
                onChange={handleSlotNameChange}/>

                <label className="mx-2">Czas od</label>
                <SelectTimes selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes} timeArr={timeArr}/>
               

                <label className="mx-2">Dla grup</label>
                    <SelectGroups selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups} groups={groups}/>
                
                <div className=' mt-14 mb-2 flex w-full justify-center flex-row'>

                <button 
                className="w-20 rounded-md border-sky-500  border-2 mx-1
                            hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleAddClick}>{slotMessage !== false? "Dodaj" : "Zmień"}</button>
                {showRemoveButton && <button 
                className="w-20 rounded-md border-red-400  border-2 mx-1
                            hover:text-white hover:bg-red-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleRemoveClick}>Usuń</button>}
                </div>
                </form>
        </div>
    );

};
