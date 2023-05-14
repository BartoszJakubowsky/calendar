import { useState } from "react";
import axios from "axios";
export default function User({item, setMessage, updateAll}) 
{
    
    const [editMode, setEditMode] = useState();
    const [fullName, setFullName] = useState(item.name || '');
    const name_surname = item.name? item.name.split(' ') : ['', ''];
    const [name, setName] = useState(name_surname[0])
    const [surname, setSurname] = useState(name_surname[1]);
    const [mail, setMail] = useState(item.mail || '');
    const [permissions, setPermissions] = useState(item.perrmissions || ['Użytkownik'])
    const [slots, setSlots] = useState(item.records || []);
    
    const [activeUser, setActiveUser] = useState(false);




    const handleNameChange = event =>
    {
        const _name = event.target.value;
        setName(_name);
    }

    const handleSurameChange = event =>
    {
        const _surname = event.target.value;
        setSurname(_surname);
    }

    const handleMailChange = event =>
    {
        const _mail = event.target.value;
        setMail(_mail);
    }

    const handleSaveClick = () =>
    {
        setActiveUser(true);

        const user = {...item, name: name + ' ' + surname, mail: mail, permissions: permissions }

        axios.post('http://localhost:3002/user/add', user).then(response => 
        {  
                console.log(response);
                if (!response)
                    setMessage('Coś poszło nie tak');
                else
                    {
                        setMessage(response.data.message);
                        updateAll(response.data.data);
                    }
            
        }).catch(err => console.log('Błąd podczas pobierania danych', err))

        setActiveUser(false);
    }

    const handleDeleteClick = () =>
    {
        setActiveUser(true)
        const deleteUser = item;
        axios.delete(`http://localhost:3002/user/delete`, {data: {id: deleteUser._id} }).then(response => 
        {
                if (!response)
                        setMessage('Coś poszło nie tak');   
                else
                    {
                        setMessage(response.data.message);
                        updateAll(response.data.data);
                    }
            
        }).catch(err => console.log('Błąd podczas wysyłania', err))
    
        setActiveUser(false);
    }
    

    return (
        editMode? 
        //edit mode
        <div className=" text-xs md:text-base flex flex-row justify-between">
            <div className="flex flex-col">
            <div className="flex flex-row mt-2">
                <label className="px-2">Imię:</label>
                <input className="border-2 border-slate-200 w-full ml-2 focus:border-slate-400 text-slate-600 focus:outline-none" value={name} onChange={handleNameChange}/>
            </div>
            <div className="flex flex-row">
                <label className="px-2">Nazwisko:</label>
                <input className="border-2 border-slate-200 w-full ml-2 focus:border-slate-400 text-slate-600 focus:outline-none" value={surname} onChange={handleSurameChange}/>
            </div>
            <div className="flex flex-row">
                <label className="px-2">Mail: </label>
                <input className="border-2 border-slate-200 w-full ml-2 focus:border-slate-400 text-slate-600 focus:outline-none" value={mail} onChange={handleMailChange}/>
            </div>
            <div className="flex flex-row">
                <label className="px-2">Uprawnienia: </label>
                <select className="order-2 border-slate-200 w-full ml-2 focus:border-slate-400 text-slate-600 focus:outline-none"><option>Użytkownik</option><option>Użytkownik, Admin</option></select>
            </div>
            </div>
            <div className="flex flex-col items-end mr-2 ">
                <button onClick={()=>setEditMode(!editMode)} className=" bg-blue-400 w-full p-2 h-fit mt-2  rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-blue-100 duration-200">Anuluj</button>
            <div className={`flex flex-row ${(activeUser)? 'pointer-events-none' : ''}`}>
                {(item.name === name + ' ' + surname && item.mail === mail ) === true? false : 
                    <button onClick={handleSaveClick} className="bg-green-400 w-fit p-2 h-fit mt-2 mr-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-blue-100 duration-200">Zapisz</button>}
                <button onClick={handleDeleteClick} className="bg-red-400 w-fit p-2 h-fit mt-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-blue-100 duration-200">Usuń</button>
            </div>
            </div>
      </div>
        :
        //normal mode
      <div className=" text-xs md:text-base flex flex-row justify-between">
        <div className="flex flex-col mt-2">
        <div className="flex flex-row">
            <h4 className="px-2">Nazwa:</h4>
            <p className="">{fullName}</p>
        </div>
        <div className="flex flex-row">
            <h4 className="px-2">Mail: </h4>
            <p>{mail}</p>
        </div>
        <div className="flex flex-row">
            <h4 className="px-2">Uprawnienia: </h4>
            <p>{permissions}</p>
        </div>
        </div>
        <button onClick={()=>setEditMode(!editMode)} className="bg-blue-400 w-fit p-2 h-fit mt-2 mr-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-blue-100 duration-200">Edytuj</button>
      </div>
  )
}