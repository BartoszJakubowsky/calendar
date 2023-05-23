export default function Time({timeArr, ...rest}) 
{

    return (
        <div 
            className={`flex w-full flex-col bg-white`}>
                <div className="h-20 border-b-2 border-black "></div>
                {timeArr.map((time, index) => 
                {
                    return <div key={time} className={`bg-white flex w-10 h-10 flex-1 border-b-2 border-black items-center justify-center`} time={time}>{time}</div>
                })}
        </div>)
}