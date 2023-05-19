import {motion as m} from 'framer-motion';
import axios from 'axios';
import { useState } from 'react';

export default function UserRegister({items, setMessage, updateAll, setConvirm}) 
{

    const [userIndex, setUserIndex] = useState(false);
    const [allIndex, setAllIndex] = useState(false)
    const variantsForUsersPasswords = 
    {
          hidden: { opacity: 0, y: -200},
          enter: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8}},
          exit: { opacity: 0, x: 0, y: -200},
    }


    

    const handleAccpetRegister = (index) => 
    {
        const user = [items[index]];
        setUserIndex(index);
        axios.post('http://localhost:3002/register/add', user).then(response => 
        {  
            

                if (!response)
                    setMessage('Coś poszło nie tak');
                else
                    {
                        console.log(response);
                        setMessage(response.data.message);
                        updateAll(response.data.data);
                        setUserIndex(false);
                    }
        }).catch(err => console.log('Błąd podczas pobierania danych', err))
        setUserIndex(false);
    }

    const handleAccpetAll = () => 
    {
        setAllIndex(true);
        const acceptedUsersToRegister = items;
        if (acceptedUsersToRegister.length === 0)
            return;
            
        axios.post('http://localhost:3002/register/add', acceptedUsersToRegister).then(response => 
        {
            
                if (!response)
                    setMessage('Coś poszło nie tak');
                else
                    {
                        setMessage(response.data.message);
                        updateAll(response.data.data);
                        setAllIndex(false);
                    }
            
        }).catch(err => console.log('Błąd podczas wysyłania', err))
    }

    const handleDeleteRegister = (index) =>
    {
            setUserIndex(index)
            const deleteUserFromRegister = items[index];
            axios.delete(`http://localhost:3002/register/delete`, {data: {id: deleteUserFromRegister._id} }).then(response => 
            {
                    if (!response)
                            setMessage('Coś poszło nie tak');   
                    else
                        {
                            setMessage(response.data.message);
                            updateAll(response.data.data);
                        }
                
            }).catch(err => console.log('Błąd podczas wysyłania', err))
        
        setUserIndex(false);
    }
         
    
    const registerComponent = items.map((user, index)=>
    {
        return (
            <div key={index} className='md:text-lg text-gray-700 border-b border-x border-gray-500 bg-slate-100 flex flex-row justify-between items-center'>
                <div className='flex flex-col pl-2'>
                <p>{user.name}</p>
                <p>{user.mail}</p>
                </div>
                
                <div className={`flex flex-row ${(userIndex === index || allIndex)? 'pointer-events-none' : ''}`}>
                    <button onClick={() => handleAccpetRegister(index)} className="bg-blue-400 w-fit p-2 h-fit mr-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-blue-100 duration-200">Zaakceptuj</button>
                    <button onClick={()=>handleDeleteRegister(index)} className="bg-red-400 w-fit p-2 h-fit mr-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-red-100 duration-200">Usuń</button>
                </div>
            </div>
        )
    });



    return (
        
        
      <m.div className=" relative w-full h-full bg-blue-300 overflow-auto" variants={variantsForUsersPasswords} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
        {items.length === 1 ? false : <div className="w-full md:h-20 bg-white border-x border-b-blue-300 border-b border-blue-300 flex flex-col">
        {items.length === 0? <div className='bg-slate-400 w-fit p-2 mt-2 h-fit ml-2 rounded-sm btn ripple  text-white cursor-default'>Brak nowych użytkowników 😁</div> : false}
        {items.length <= 2? false : <button onClick={handleAccpetAll} className="bg-slate-400 w-fit p-2 mt-2 h-fit ml-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-slate-100 duration-200">
            Zaakceptuj wszystkich
        </button>}
      </div>}
            {registerComponent}
        </m.div>
        
    )
}