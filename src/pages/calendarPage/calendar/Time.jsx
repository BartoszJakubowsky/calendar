export default function Time({timeArr, ...rest}) 
{

    return (
        <div 
            className={` w-16 flex flex-col bg-white`}>
                <div className="h-20 border-b-2 border-l-2 border-black "></div>
                {timeArr.map((time, index) => 
                {
                    return <div key={time} className={`bg-white flex flex-1 border-b-2 border-l-2 border-black`} time={time}>{time}</div>
                })}
        </div>)
}