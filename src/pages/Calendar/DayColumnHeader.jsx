export default function DayColumnHeader({dayDate, day, slots, isBlank}) 
{
    return (
        <div className={`h-20 flex-none border-b-2 border-black w-40 ${isBlank? 'bg-gray-300' :  'bg-amber-200'} flex flex-col`}>

                {/* day and date */}
                <div className='flex flex-col  justify-center items-center'>
                    <span className='font-semibold'>{day}</span>
                    <span>{dayDate}</span>
                </div>
                {isBlank? false : <div className='flex flex-row w-full h-full overflow-hidden'>
                {/* slots name holder */}
                {slots.map((slot, index) => {
                    return (

                        <span key={index} className="w-full h-full justify-center items-center overflow-hidden flex flex-wrap text-center border-2 break-words border-red-200">{slot.name}</span>
                    );
                })}
                </div>}
            </div>  
    )
}