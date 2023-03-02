import { useEffect, useState } from "react"

export default function Convirm({message, additional, submit = 'Tak', handleSubmit})
{

    const [visible, setVisible] = useState(true);

    useEffect(()=>
    {
        const handleKey = key =>
        {
            if (key.keyCode == 27)
                setVisible(false);
        }

        document.addEventListener('keydown', handleKey);

        return document.removeEventListener('keydown', onKeyDown)
    }, )

    const onKeyDown = key => 
    {
        //if escape
        if (key.keyCode == 27) 
            setVisible(false)
    }

    const handleClick = (isOutside = false) =>
    {
        if (isOutside)
        {
            setVisible(false);
            return;
        }
        
        handleSubmit();
        setVisible(false);
    }



    return visible && <div onClick={()=>handleClick(true)} className="relative flex justify-center items-center z-10 blur-sm top-0 left-0 h-full w-full bg-slate-400">
                        <div className="absolute z-20 bg-white shadow-sm h-80 w-50">
                            <h3 className=" text-3xl">{message}</h3>
                            additional?<p>additional</p>
                            <button onClick={handleClick}>{submit}</button>
                        </div>
                    </div>

}