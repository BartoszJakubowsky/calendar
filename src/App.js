import React, {lazy,Suspense, useMemo} from 'react';
import { Route, Routes, useLocation} from 'react-router-dom';
import {motion as m} from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";

import useCalendars from './hooks/useCalendars';
import useAuthentication from './hooks/useAuthentication';

import LoginPage from './pages/Login/LoginPage'
import MainPage from './pages/Main/MainPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import LoadingPage from './pages/Loading/LoadingPage';
const CreateCalendarPage = lazy(()=> import( './pages/Create/CreateCalendarPage'));
const AdminPage = lazy(()=> import( './pages/Admin/AdminPage'));
const LazyCalendarPage = lazy(()=> import('./pages/Calendar/CalendarPage'));

function App()
{
      const {isAdmin, isAuthenticated} = useAuthentication();
      const {calendarToEdit, navigate} = useCalendars();
      let location = useLocation();
      const formsPaths = ['/logowanie', '/haslo', '/rejestracja'];

      useMemo(()=>
      {
            if (isAuthenticated === false)
            {
                  // location = '/logowanie';
                  navigate('/logowanie');
            }
            else if (isAuthenticated)
            {
                  // navigate('/');
            }
            
      }, [isAuthenticated])
      const suspenseElement = (child) =>
      {
            return (
            <Suspense fallback={<LoadingPage/>}>
                  {child}
            </Suspense>
            )
      }             
        return (<>
                  <AnimatePresence mode='wait'>
                        <Routes key={location.pathname} location={location}>
                              {isAuthenticated}
                              <Route path='/' element={isAuthenticated? <MainPage/> : <LoadingPage/>}/>

                              {formsPaths.map(form =><Route path={form} key={form} element={<LoginPage replace/>}/>)}
                              
                        
                              <Route path='/kalendarz/:calendarName' element={suspenseElement(<LazyCalendarPage/>)}></Route>
                              
                              {isAdmin && 
                              <>
                              <Route path='/ustawienia' element={
                                    suspenseElement(<CreateCalendarPage 
                                    calendarName={calendarToEdit?.name} 
                                    calendarDate={calendarToEdit?.date} 
                                    calendarTime={calendarToEdit?.time} 
                                    calendarSlots={calendarToEdit?.slots}
                                    calendarId={calendarToEdit?._id}
                                    />)}
                                    />
                              <Route path='/admin' element={suspenseElement(<AdminPage/>)}/>   
                              </>}
                              <Route path='*'element={<NotFoundPage replace/>}/>
                              
                        </Routes>
                  </AnimatePresence>
                  </>)
}

export default App; 