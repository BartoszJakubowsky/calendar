import SlotSettingsCard from './SlotsSettingsCard';



export default function Slots({value, slotCard, onChange}) 
{
    //in the future addidiotn settings with permisision

    const showSlots = value.map(slot=>
    {
        const handleSlotChange = newSlot => onChange([slot, newSlot]);
        const handleClick = event => 
        {
            event.preventDefault();
            slotCard(<SlotSettingsCard close={slotCard} name={slot.name} space={slot.space} order={slot.order} onChange={handleSlotChange}/>)
        }

            return(
                <button
                    key={slot.order} 
                    slotname={slot.name}
                    slotspace={slot.space}
                    slotorder={slot.order}
                    onClick={handleClick}
                    className='w-24 rounded-ms h-10 bg-slate-500 text-white overflow-hidden mx-2'>
                    {slot.name}
                    </button>
            )
        })

    return (
        <div className="flex flex-row [&>*]:h-10 items-center justify-center">
            {showSlots}
        </div>
    )    
}