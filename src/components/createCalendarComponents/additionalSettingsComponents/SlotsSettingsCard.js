export default function SlotsSettingsCard({name, space ,order ,permission, close}) 
{


    const handleClick = () =>
    {
        console.log("coś tam wysłąnme");
        close(false);
    }

    return (
        <div className="absolute h-full w-full bg-red-200 pointer-events-none">
            {/* <div className="bg-white w-60 h-80 mx-auto border-black relative">
                <h3>Ustaw</h3>
                <button onClick={handleClick}></button>
            </div> */}
        </div>
    )
}