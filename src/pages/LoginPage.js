import React from 'react';
import Login from './loginPage/Login';
import Password from './loginPage/Password';
import Register from './loginPage/Register'
export default function LoginPage() {
    return (
        <div className="flex flex-col bg-indigo-100 justify-center h-screen w-screen overflow-hidden">
           <Login/>
        </div>
    );
}