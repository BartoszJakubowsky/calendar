

export default function RecordHolder({month}) 
{

    const [monthName, year] = month[0].date.split(".");

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col w-full border-slate-400 bg-blue-100 border-b-2 ">
                <h4>{monthName}</h4>
                <h4>{year}</h4>
            </div>
            <div className="flex bg-white flex-wrap h-full py-5 justify-center">
            {month.map((month, index)=>
            {
                return (
                    <div className="flex flex-col justify-center items-center bg-white text-sm w-48 h-24 m-1 border-2 border-slate-300  " key={index}>
                        <h5 className="flex flex-col">Dzień: {month.day}</h5>
                        <p className="flex flex-col">Godzina: {month.time}</p>
                        <p className="flex flex-col">Świadczenie: {month.slotName}</p>
                    </div>
                )
            })}
            </div>
        </div>
    )
}