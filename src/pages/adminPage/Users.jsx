import Accordion from "./adminComponents/Accordion";
import { useState } from "react";
export default function Users() {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => setSearch(event.target.value);

  const items = [
    { id: 0, name: 'Dupa Wołowa', mail: 'Janusz312@gmail.com', content: 'Więcej info' },
    { id: 1, name: 'Mariusz Pękacki', mail: 'Janusz312@gmail.com',content: 'Więcej info' },
    { id: 2, name: 'Jan Hitler', mail: 'Janusz312@gmail.com', content: 'Więcej info' },
    { id: 3, name: 'Beata Szydło', mail: 'Janusz312@gmail.com', content: 'Więcej info' }
  ];

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));











  







  return (
    <div className="w-full h-full">
      <div className="w-full h-20 bg-white border-x border-blue-300 flex flex-col">
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
        const content = (
            <>
            <div className="flex flex-row">
                <h4 className="px-2">Nazwa:</h4>
                <p className="">{item.name}</p>
            </div>
            <div className="flex flex-row">
                <h4 className="px-2">Mail: </h4>
                <p>{item.mail}</p>
            </div>
            </>
        )
        return (
            <Accordion
            label={item.name}
            content={content}
            key={index}
            search={search}
    />
        )
      }
    )}
    </div>
  );
}