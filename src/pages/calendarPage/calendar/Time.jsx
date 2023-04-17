export default function Time({timeArr, ...rest}) 
{

    return (
        <div 
            className={` w-16 flex flex-col bg-yellow-200`}>
                <div className="h-10 opacity-0 ">czas</div>
                {timeArr.map((time, index) => 
                {
                    return <div key={time} className={`bg-yellow-500 flex flex-1 justify-center`} time={time}>{time}</div>
                })}
        </div>)
}