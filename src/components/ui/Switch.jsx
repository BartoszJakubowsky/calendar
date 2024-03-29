
import { useState } from "react";
import { motion as m } from "framer-motion";
import { hover } from "@testing-library/user-event/dist/hover";

export default function Switch ({onClick, onRender})
{
    const [isOn, setIsOn] = useState(onRender);

    const toggleSwitch = () => 
    {
        setIsOn(!isOn);
        onClick(!isOn)   
    }
  
    return (
      <div className={`w-20 h-8 bg-white border-2 border-slate-300 flex ${isOn? 'justify-end' : 'justify-start'} items-center cursor-pointer rounded-3xl p-2 "`} 
      onClick={toggleSwitch}
      >
        <m.div className={`w-6 h-6 ${isOn? 'bg-pink-300 hover:bg-pink-400' : 'bg-sky-400 hover:bg-sky-500'}  cursor-pointer rounded-3xl`} layout transition={spring} />
      </div>
    );
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };