import { useState } from "react";
import { useSpring, animated } from 'react-spring';
import Password from "./Password";
import LoadingIcon from "../../components/LoadingIcon";

export default function Login({mail, setMail, move}) 
{

    const [password, setPassword] = useState('');


    const [mailError, setMailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const mailCheck = mail.length <= 5 || mail === '';
    const passwordCheck = password.length <= 3 || password === '';

    const [sent, setSent] = useState(false);

    
    const handleMailChange = (event) => 
    {   
        
        if (mailError && !mailCheck)
            setMailError(false);

        setMail(event.target.value);
    }


    const handleRegisterClick = () => 
    {
        // window.history.pushState({}, '', '/register');  
        move(2);
    }
    const handlePasswordClick = () => 
    {
        // window.history.pushState({}, '', '/password');  
        move(0);
    }

    const handlePasswordChange = (event) => 
    {

        if (passwordError && !passwordCheck)
            setPasswordError(false)
        
        setPassword(event.target.value);
    }


    const handleSendClick = (event) =>
    {
        event.preventDefault();

        

        if (mailCheck)
            setMailError(true)
      
        if (passwordCheck)
            setPasswordError(true);


        if (mailCheck || passwordCheck)
            setSent(false);
        else
            setSent(true);  
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
               Zaloguj się
            </h1>
            <form className="mt-6">
                <div className="mb-2">
                    <label
                        // for="email"
                        className={`block text-sm font-semibold  ${mailError? 'valid text-red-300 duration-75' : 'text-gray-800 duration-300'}`}
                    >
                        Twój email
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
                        // for="password"
                        className={`block text-sm font-semibold ${passwordError? ' valid text-red-300' : 'text-gray-800'}`}
                    >
                        Twoje hasło
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
                </div>
       
              <div className="overflow-hidden">
              <a
                        className="text-xs text-purple-600 hover:underline cursor-pointer"
                        onClick={handlePasswordClick}
                    >
                        Zapomniałeś hasła?
                    </a>
                <animated.button
                    style={buttonAnimation}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                    onClick={handleSendClick}
                >
                    Zaloguj się
                </animated.button>

                <animated.div style={messageAnimation} className="w-full px-4 py-2 tracking-wide text-center flex justify-center flex-col">
                    Poczekaj, sprawdzamy twoje dane
                  <LoadingIcon classname='fill-purple-700'/>
                </animated.div>
               
                </div>
            </form>
            <p className="mt-8 text-xs font-light text-center text-gray-700 flex flex-col ">
                    
                    Nie masz jeszcze konta?
                    <a
                        className="font-medium text-purple-600 hover:underline cursor-pointer"
                        onClick={handleRegisterClick}
                    >
                        Wyślij prośbę o rejestrację
                    </a>
                </p>
        </div>
);
}