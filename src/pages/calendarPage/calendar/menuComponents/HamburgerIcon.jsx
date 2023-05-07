import React, { useState } from "react";
import { motion as m } from "framer-motion";

export default function HamburgerIcon({calendarName, isOpen, setIsOpen,...rest}) 
{
const appStyles = "app flex items-center justify-center pt-10";
const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
  return (
    <m.div className={appStyles + rest.className} onClick={rest.onClick} transition={{duration:0.25, ease: 'easeOut'}} exit={{opacity: 0}} initial={{x: '-100%'}} animate={{x: "0%"}}>
      <button
        className="flex flex-col h-12 w-12 rounded justify-center items-center group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? "rotate-45 translate-y-3 bg-gray-600 group-hover:bg-black"
              : "bg-gray-600 group-hover:bg-black"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? "opacity-0" : "bg-gray-600 group-hover:bg-black"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? "-rotate-45 -translate-y-3 bg-gray-600 group-hover:bg-black"
              : "bg-gray-600 group-hover:bg-black"
          }`}
        />
      </button>
    </m.div>
  );

}