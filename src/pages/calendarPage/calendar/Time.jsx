export default function Time({timeArr, ...rest}) 
{

    const showTime = timeArr.map((time, index) => 
        {
              return <div key={index} className={`bg-yellow-200`} time={time}>{time}</div>
        })

    return (
        <div 
            className={`${rest.className} bg-yellow-200`}>
                <div className="">Czas</div>
                {showTime}
        </div>)
}