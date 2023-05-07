import { useState, useEffect } from "react";
import { useSpring, animated } from 'react-spring';
import Password from "./Password";
import axios from "axios";
export default function Register({mail, setMail, moveBack}) 
{

  

   
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);

    const [mailError, setMailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const mailCheck = mail.length <= 5 || mail === '';
    const nameCheck = name.length <=3 || name === '';
    const surnameCheck = surname.length <= 3 || surname === '';
    const passwordCheck = password.length <= 3 || password === '' || password !== secondPassword;

    const [sent, setSent] = useState(false);

    
    const handleMailChange = (event) => 
    {   
        
        if (mailError && !mailCheck)
            setMailError(false);

        setMail(event.target.value);
    }


    const handleNameChange = (event) => 
    {
        if (nameError && !nameCheck)
        setNameError(false);

        setName(event.target.value);
    }
    const handleSurnameChange = (event) => 
    {
        if (surnameError && !surnameCheck)
            setSurnameError(false)

        setSurname(event.target.value);
    }


    const handlePasswordChange = (event) => 
    {

        if (passwordError && !passwordCheck)
            setPasswordError(false)
        
        setPassword(event.target.value);
    }
    const handleSecondPasswordChange = (event) => 
    {
            if (passwordError && !passwordCheck)
                setPasswordError(false)
            
        setSecondPassword(event.target.value);
    }

    const handleSendClick = (event) =>
    {
        event.preventDefault();

        

        if (mailCheck)
            setMailError(true)
        if (nameCheck)        
            setNameError(true)
        if (surnameCheck)
            setSurnameError(true)
        if (passwordCheck)
            setPasswordError(true);


        if (mailCheck || nameCheck || surnameCheck || passwordCheck)
        {
            setSent(false);
            return;
        }

            setSent(true);  

            setTimeout(() => {
                setSent(false)
            }, 3000);
            // axios.post('http://localhost3001/register', {name: name+ ' ' + surname , mail, password}).then(response => 
            // {

            //     // if(response.data.message)
            //     //     setLoginStatus(response.data.message);
            //     // else
            //     //     setLoginStatus(false);
            // })


    }

    const buttonAnimation = useSpring({
        opacity: sent ? 0 : 1,
        transform: sent ? 'translateY(0%)' : 'translateY(100%)'
       
      });
    
      const messageAnimation = useSpring({
        opacity: sent ? 1 : 0,
        transform: sent ? 'translateY(0%)' : 'translateY(100%)',
      });

      
    return (
        <div className=" w-11/12 md:w-1/2 p-6 m-auto bg-white rounded-md shadow-md">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
               Zarejestruj się
            </h1>
            <form className="mt-6">
                <div className="mb-2">
                    <label
                        // for="email"
                        className={`block text-sm font-semibold  ${mailError? 'valid text-red-300 duration-75' : 'text-gray-800 duration-300'}`}
                    >
                        Wporawdź swój email
                    </label>
                    <input
                        type="email"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleMailChange}
                        onBlur={handleMailChange}
                        value={mail}
                        required 
                        autoComplete="on"
                    />
        
                    <label
                        // for="text"
                        className={`block text-sm font-semibold ${nameError? ' valid text-red-300' : 'text-gray-800'}`}
                    >
                        Podaj swoje imię
                    </label>
                    <input
                        type="text"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleNameChange}
                        onBlur={handleNameChange}
                        value={name}
                        required 
                        autoComplete="on"
                    />


                    <label
                        // for="text"
                        className={`block text-sm font-semibold ${surnameError? ' valid text-red-300' : 'text-gray-800'}`}
                    >
                        Podaj swoje nazwisko
                    </label>
                    <input
                        type="text"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleSurnameChange}
                        onBlur={handleSurnameChange}
                        value={surname}
                        required 
                        autoComplete="on"
                    />

                    <label
                        // for="password"
                        className={`block text-sm font-semibold ${passwordError? ' valid text-red-300' : 'text-gray-800'}`}
                    >
                        Stwórz hasło
                    </label>
                    <input
                        type="password"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordChange}
                        value={password}
                        required 
                        autoComplete="on"
                    />

                    <label
                        // for="password"
                        className={`block text-sm font-semibold ${passwordError? ' valid text-red-300' : 'text-gray-800'}`}
                    >
                        Powtórz hasło
                    </label>
                    <input
                        type="password"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleSecondPasswordChange}
                        onBlur={handleSecondPasswordChange}
                        value={secondPassword}
                        required 
                        autoComplete="on"
                    />
                    
                </div>
       
              <div className="overflow-hidden">
                <animated.button
                    style={buttonAnimation}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                    onClick={handleSendClick}
                >
                    Poproś o rejestrację konta
                </animated.button>

                <animated.div style={messageAnimation} className="w-full px-4 py-2 tracking-wide text-center rounded-md">
                    Twoja prośba o rejestrację została wysłana do Rysia Pysia
                </animated.div>

                </div>
            </form>
         
        </div>
);
}