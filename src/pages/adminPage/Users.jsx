import Accordion from "./adminComponents/Accordion";
import {useState } from "react";
import {motion as m} from 'framer-motion';
import User from "./adminComponents/User";

export default function Users({items}) {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => setSearch(event.target.value);

  

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  //slot example
//   {
//     "calendar": "Środa Wielkopolska",
//     "date": "MAJ.2023",
//     "weekIndex": 0,
//     "day": "CZWARTEK",
//     "time": "12:00",
//     "slotName": "Oficjalne",
//     "slotIndex": 1,
//     "sign": "Bartosz Jakubowski"
// }


  // const user = 
  // {
  //   Name:
  //   Mail:
  //   Permissions: 
  //   Records
  // }

  const variantsForUsers = 
  {
        hidden: { opacity: 0, y: -200},
        enter: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8}},
        exit: { opacity: 0, x: 0, y: -100},
  }
  return (
    <m.div className="w-full h-full bg-blue-300 overflow-auto" variants={variantsForUsers} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
      <div className="w-full h-14 md:h-20 bg-white border-x border-b-blue-300 border-b border-blue-300 flex flex-col ">
        <label className="text-slate-600 ml-2 mt-2">
          Wyszukaj użytkownika
        </label>
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="border-2 border-slate-200 w-80 ml-2 focus:border-slate-400 text-slate-600 focus:outline-none"
        />
      </div>
      {filteredItems.map((item, index) => 
      {
        return (
            <Accordion
            label={item.name}
            content={<User item={item}/>}
            key={index}
            search={search}
    />
        )
      }
    )}
    </m.div>
  );
}